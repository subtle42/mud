import { AnyAction, createStore } from "redux"
import { Socket } from "socket.io"
import { logger } from "../logger"

type BuildOpts = {
    school?: string
    alias?: string | string[],
    desc?: string
}
type HandlerFn = (inputs: Arguments, socket: SocketMessenger) => void

interface OptionOpts {
    demand?: boolean
    map?: (input:string) => any
    validateFn?: (input:string) => boolean
    desc?: string
    helpText?: string
}
interface CmdOpts extends OptionOpts {
    name: string
}
interface CmdMainOpts extends BuildOpts {
    name: string
    options: CmdOpts[]
    handler: HandlerFn
}

type Arguments<T = {}> = T & {
    /** Non-option arguments */
    _: Array<string | number>;
    /** The command name */
    $0: string;
    /** All remaining options */
    [argName: string]: unknown;
};


const buildFns = (config: CmdMainOpts) => ({
    option: (name: string, opts?: OptionOpts) => {
        config.options.push({name, ...opts})
        return buildFns(config)
    },
    handler: (handlerFn: HandlerFn) => {
        config.handler = handlerFn
        return buildFns(config)
    }
})

type SocketMessenger = {
    respond: (...input) => void,
    zone: (...input) => void,
    room: (...input) => void,
    error: (...input) => void
}

export const buildMsgr = (socket: Socket): SocketMessenger => {
    return {
        respond: (...input) => socket.send(input),
        zone: (...input) => socket.broadcast.emit('msg', input),
        room: (room: string, ...input) => socket.in(room).emit('msg', input),
        error: (...input) => {
            logger.error(input)
            socket.emit('issue', input)
        }
    }
}

export function buildCmd(name: string, opts: BuildOpts = {}) {
    const config: CmdMainOpts = {
        name,
        options: [],
        handler: (inputs, socket) => {
            console.error(`${inputs.$0} has not been implemented`)
            socket.error(`${inputs.$0} has not been implemented`)
        },
        ...opts
    }

    if (getCmd(name)) throw new Error(`Duplicate command ${name}, already exists.`)
    if (typeof opts.alias === 'string') opts.alias = [opts.alias]
    opts.alias?.forEach(a => {
        if (getCmd(a)) throw new Error(`Duplicate alias ${a}, for command ${name}, already exists.`)
    })
    cmdStore.dispatch({ type: 'add', payload: config })
    return buildFns(config)
}

export function runCmd(input: string, socket: SocketMessenger) {
    const tmp = input.split(' ').filter(x => x !== '')
    const res: Arguments = {
        $0: tmp.shift() || '',
        _: [...tmp]
    }
    const cmd = getCmd(res.$0)
    if (!cmd) return socket.error(`<div style="color:red">Could not find command: ${res.$0}</div>`)
    // Setting variable to cmd name if 'alias' is being used
    if (res.$0 !== cmd.name) res.$0 = cmd.name
    
    try {
        for(let i=0; i<cmd.options.length; i++) {
            const opt = cmd.options[i]
            const val = tmp[i]
            if (opt.demand && !val) {
                return socket.respond(`${res.$0} ${cmd.options.map(o => `[${o.name}]`).join(' ')}`)
            }
            if (!val) continue
            if (opt.validateFn && !opt.validateFn(val)) {
                return socket.respond(`${res.$0} [${opt.name}], ${opt.helpText}`)
            }
            res[opt.name] = res._.shift()
        }
        cmd.handler(res, socket)
    } catch (e) {
        socket.error(JSON.stringify(e))
    }
}

class CmdState {
    [key: string]: CmdMainOpts
}

interface myAction extends AnyAction {
    payload: CmdMainOpts
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
        state[action.payload.name] = action.payload
        if (action.payload.alias && typeof action.payload.alias === 'string') {
            state[action.payload.alias] = action.payload
        }
        if (action.payload.alias && Array.isArray(action.payload.alias)) {
            action.payload.alias.forEach(a => state[a] = action.payload)
        }
    }
    return state
}

export const cmdStore = createStore(rootReducer)


export const getCmd = (name: string): CmdMainOpts => {
    return cmdStore.getState()[name]
}

export const getCmdsInSchool = (school: string): CmdMainOpts[] => {
    return Object.values(cmdStore.getState())
        .filter(x => x.school === school)
}

