import { MudStore } from "../store";

type ReducerMap = {[key:string]: (store: MudStore, payload: any)=>MudStore}

interface ISkill {
    name: string
    school: string
    level: string
    syntax: string
    worksAgainst: string
    details: string
}

export const reducers: ReducerMap = {
    addCmd: (store, payload) => {
        // Do not add duplicate commands
        if (payload === store.cmd.history[0]) return store
        store.cmd = {index: -1, history: [payload, ...store.cmd.history]}
        return store
    },
    setCmdIndex: (store, payload) => {
        store.cmd = {...store.cmd, index: payload}
        return store
    },
    addMsg: (store, payload) => {
        store.msgs = [payload, ...store.msgs]
        return store
    }
}
