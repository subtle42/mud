import { store } from "../store"
import {connect} from 'socket.io-client'

const client = connect("localhost:3000", {
    // auth: {
    //     token: ''
    // },
})
client.on('msg', res => addMsg(res))

export const sendCmd = (payload: string): void => {
    store.dispatch({
        type: 'addCmd',
        payload
    })
    client.emit('cmd', payload, res => {
        console.log('res', res)
        addMsg(res)
    })
}

export const getPrevCmd = (): string => {
    const {index, history} = store.getState().cmd
    if (index === (history.length - 1)) return ''
    setCmdIndex(index + 1)
    return history[index + 1]
}

export const getNextCmd = (): string => {
    const {index, history} = store.getState().cmd
    if (index <= 0) return ''
    setCmdIndex(index - 1)
    return history[index - 1]
}

const addMsg = (payload: string): void => {
    store.dispatch({
        type: 'addMsg',
        payload
    })
}

const setCmdIndex = (index: number): void => {
    store.dispatch({
        type: 'setCmdIndex',
        payload: index
    })
}