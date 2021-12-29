import { Socket } from 'socket.io';
import {AnyAction, createStore} from 'redux'

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
    option: (name: string, builder: OptionInput) => CmdBuilder
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

export const buildCmd: BuildCmd = (name, opts, builder?: Function, handler?) => {
    const tmp: Partial<Cmd> = {name, options: []}
    if (typeof opts === 'function') {
        tmp.handler = opts as any
        opts = {}
    } else if (typeof opts === 'object' && builder && !handler) {
        tmp.handler = builder as any
    } else if (typeof opts === 'function' && typeof builder === 'function') {
        tmp.handler = builder as any
        builder = opts
        opts = {}
    } else {
        const myOptFn = (name: string, opt: OptionInput) => {
            tmp.options?.push({...opt, name})
            return {option: myOptFn}
        }
        builder && builder({option: myOptFn})
        Object.assign(tmp, opts)
        tmp.handler = handler as any
    }
    cmdStore.dispatch({ type: 'add', payload: tmp as Cmd})
}


export const getCmd = (cmdName: string): Cmd => {
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

const handleError = (cmd?: Cmd) => {
    return [
        `${cmd?.name}`
    ]
}

const printHelp = (cmd: Cmd) => {
    return `${cmd.name} ${cmd.options.map(o => ` [${o.name}]`)}`
}

export const runCmd = (input: string, ack: (input: string | string[])=>void, socket: Socket): Promise<void> | void=> {
    const tmp = input.split(' ').filter(x => x !== '')
    const res: Arguments = {
        $0: tmp.shift() || '',
        _: tmp
    }
    const cmd = getCmd(res.$0)
    if (!cmd) return ack(`<div style="color:red">Could not find command: ${res.$0}</div>`)
    cmd.options.forEach((opt, index) => {
        if (opt.type && typeof res._[0] !== opt.type) return handleError(cmd)
        if (opt.validator && !opt.validator(res._[0])) return handleError(cmd)
        res[opt.name] = res._.shift()
    })
    cmd.handler(res, ack, socket)
}

export const getCommdandList = (): string[] => {
    return Object.values(cmdStore.getState())
        .filter(v => !v.isAlias)
        .map(v => v.cmd.name)
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

const cmdStore = createStore((state: CmdState=new CmdState(), action: myAction) => {
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
})

