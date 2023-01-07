import { isObject } from "util"

type BuildOpts = {
    alias?: string | string[]
}

function addCmd() {}


function coerce (input: {[key: string]: Function}): void
function coerce (input: string, fn: Function): void
function coerce (input, fn?) {
    if (fn && typeof fn !== 'function') {
        throw new Error('second input if given must be a function')
    }
    if (fn && typeof input !== 'string') {
        throw new Error('first input needs a string if function is supplied')
    }
    if (typeof input === 'string') {

    }
    if (typeof input === 'object') {}
}


export function buildCmd(name: string, opts: BuildOpts, handler) {

    return {
        option: (optName: string, opts) => {

        },
        demandOption: (demands: string[], demandText: string) => {

        },
        coerce: () => {}
    }
}