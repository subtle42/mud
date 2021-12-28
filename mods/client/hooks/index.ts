import * as React from 'react'
import { store } from '../store'

const getWindowDim = ():{x: number, y: number} => {
    return {
        x: window.innerWidth,
        y: window.innerHeight
    }
}

export const useWindowDim = (): {x: number, y: number} => {
    const [dims, setDims] = React.useState(getWindowDim())

    React.useEffect(() => {
        const handleResize = () => setDims(getWindowDim())
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return dims
}

export const useMsgs = (): string[] => {
    const [msgs, setMsgs] = React.useState(store.getState().msgs)

    React.useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const currMsgs = store.getState().msgs
            if (currMsgs === msgs) return
            setMsgs(currMsgs)
        })

        return () => unsubscribe()
    }, [])

    return msgs
}

window.addEventListener('beforeunload', e => {
    if (!window.confirm('Are you sure you want to leave?')) e.preventDefault()
}, false)