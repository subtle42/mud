import { Socket } from 'socket.io';
import {AnyAction, createStore } from 'redux'
import { pipe } from '@mud/utils'

interface Option extends OptionInput {
    name: string
}

interface OptionInput {
    desc?: string
    validator?: (input: string | number) => boolean
    type?: string
    demand?: boolean
}

interface CmdOpts {
    alias?: string | string[],
    desc?: string
    school?: string
}

interface Cmd extends CmdOpts{
    name: string
    options: Option[],
    handler: BuildHandler
}

interface CmdBuilder {
    option: (name: string, builder?: OptionInput) => CmdBuilder
}

type Arguments<T = {}> = T & {
    /** Non-option arguments */
    _: Array<string | number>;
    /** The script name or node command */
    $0: string;
    /** All remaining options */
    [argName: string]: unknown;
};

interface BuildHandler {
    (inputs: Arguments, ack: (res: string|string[]) => void, socket: Socket): void
}

interface BuildCmd {
    (name: string, opts: CmdOpts, builder: (args:CmdBuilder) => void, handler: BuildHandler): void
    (name: string, builder: (args:CmdBuilder) => void, handler: BuildHandler): void
    (name: string, opts: CmdOpts, handler: BuildHandler): void
    (name: string, handler: BuildHandler): void
}


export const buildCmd: BuildCmd = (name, opts: any, builder?: Function, handler?) => {
    const tmp: Partial<Cmd> = {name, options: []}
    
    if (typeof opts === 'function' && !builder) {
        tmp.handler = opts as any
        opts = {}
    } else if (typeof opts === 'object' && builder && !handler) {
        tmp.handler = builder as any
        Object.assign(tmp, opts)
    } else if (typeof opts === 'function' && typeof builder === 'function') {
        tmp.handler = builder as any
        const myOptFn = (name: string, opt: OptionInput) => {
            tmp.options?.push({...opt, name})
            return {option: myOptFn}
        }
        opts({option: myOptFn})
    } else {
        const myOptFn = (name: string, opt: OptionInput) => {
            tmp.options?.push({...opt, name})
            return {option: myOptFn}
        }
        builder && builder({option: myOptFn})
        Object.assign(tmp, opts)
        tmp.handler = handler as any
    }
    if (cmdStore.getState()[name]) throw new Error(`buildCmd duplicate cmd: ${name}`)
    if (tmp.alias && typeof tmp.alias === 'string' && cmdStore.getState()[tmp.alias]) {
        throw new Error(`buildCmd duplicate cmd: ${name}`)
    }
    if (tmp.alias && Array.isArray(tmp.alias)) {
        tmp.alias.forEach(a => {
            if (!cmdStore.getState()[a]) return
            throw new Error(`buildCmd duplicate cmd: ${name}`)
        })
    }
    cmdStore.dispatch({ type: 'add', payload: tmp as Cmd})
}


const getCmd = (cmdName: string): Cmd => {
    return cmdStore.getState()[cmdName]?.cmd
}

export const getCmdsInSchool = (school: string): Cmd[] => {
    const res: Cmd[] = []
    Object.keys(cmdStore.getState()).forEach(key => {
        if(cmdStore.getState()[key].cmd.school?.toLowerCase() !== school.toLowerCase()) return
        res.push(cmdStore.getState()[key].cmd)
    })
    return res
}


const handleErr = () => ''
const formatInputString = (str: string) => str.split(' ').filter(x => x !== '')
const demandOpt = (isDemanded: boolean) => (val: string):boolean|undefined => isDemanded && !!val
const validatorOpt = (valFn?: (input: string)=>boolean) => (val:string):boolean|undefined => valFn && valFn(val)
const typeOpt = (type?:string) => (val: string):boolean|undefined => !!type && typeof val === type
const validateOption = (opt: Option) => (val: string): string|undefined => {
    if (!demandOpt(opt.demand as boolean)(val)) return
    if (!validatorOpt(opt.validator)(val)) return
    if (!typeOpt(opt.type)(val)) return
    return val
}


const buildArgs = pipe(
    formatInputString,
    (x) => ({
        $0: x.shift() || '',
        _: [...x]
    })
)
const mapCmdName = (cmd?:Cmd) => (arg:Arguments):Arguments => {
    if (!cmd) return arg
    arg = {...arg}
    if (arg.$0 !== arg.name) arg.$0 = cmd.name
    return arg
}

const getValFromInput = (str:string) => {
    const vals = formatInputString(str)
    return (index: number): string => vals[index]
}

const fnRunCmd = (input: string) => (socket:Socket) => {
    const cmd = pipe(buildArgs, x => x.$0, getCmd)(input)
    if (!cmd) return handleErr()
    const res = pipe(buildArgs, mapCmdName(cmd))(input)
    
    cmd.options.forEach((opt, i) => {
        const val = pipe(
            getValFromInput(input),
            validateOption(opt)
        )(i)
        if (!val) return new Error('')
        res[opt.name] = val
    })
}

export const runCmd = (input: string, ack: (input: string | string[])=>void, socket: Socket): Promise<void> | void=> {
    const tmp = input.split(' ').filter(x => x !== '')
    const res: Arguments = {
        $0: tmp.shift() || '',
        _: [...tmp]
    }
    const cmd = getCmd(res.$0)
    if (!cmd) return ack(`<div style="color:red">Could not find command: ${res.$0}</div>`)
    if (res.$0 !== cmd.name) res.$0 = cmd.name
    try {
        for(let i=0; i<cmd.options.length; i++) {
            const opt = cmd.options[i]
            const val = tmp[i]
            if (opt.demand && !val) return ack(`${res.$0} ${cmd.options.map(o => `[${o.name}]`).join(' ')}`)
            if (!val) continue
            if (opt.validator && !opt.validator(val)) return ack('validator fn')
            if (opt.type && typeof val !== opt.type) return ack('typeof')
            res[opt.name] = res._.shift()
        }
        cmd.handler(res, ack, socket)
    } catch (e) {
        ack(JSON.stringify(e))
    }
}

class CmdState {
    [key: string]: {
        cmd: Cmd
        isAlias?: boolean
    }
}

interface myAction extends AnyAction {
    payload: Cmd
}

// Should reset the store
const rootReducer = (state: any, action: any) => {
    if (action.type === 'RESET') {
        state = undefined
    }
    return cmdReducers(state, action)
}

const cmdReducers = (state: CmdState=new CmdState(), action: myAction) => {
    if (action.type === 'add') {
        state = {...state}
        state[action.payload.name] = {cmd: action.payload}
        if (action.payload.alias && typeof action.payload.alias === 'string') {
            state[action.payload.alias] = {cmd: action.payload, isAlias: true}
        } else if(action.payload.alias && Array.isArray(action.payload.alias)) {
            action.payload.alias.forEach(a => state[a] = {cmd: action.payload, isAlias: true})
        }
    }
    return state
}

export const cmdStore = createStore(rootReducer)


