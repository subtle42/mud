import { AnyAction, createStore } from 'redux'
import { reducers } from './reducers'

const reducerKeys = Object.keys(reducers)

interface IAction extends AnyAction {
    type: string
    payload: any
}

class CmdStore {
    index: number = -1
    history: string[] = []
}

export class MudStore {
    cmd = new CmdStore()
    msgs: string[] = []
}

export const store = createStore((state:MudStore=new MudStore(), action:IAction) => {
    if (reducerKeys.includes(action.type)) {
        return reducers[action.type](state, action.payload)
    }
    return state
})