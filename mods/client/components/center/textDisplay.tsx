import * as React from 'react'
import { useMsgs, useWindowDim } from '../../hooks'

interface Props {
    style?: React.CSSProperties
}

export const TextDisplayComponent: React.FunctionComponent<Props> = (props) => {
    const msgs = useMsgs()
    const height = useWindowDim().y - 160
    const style: React.CSSProperties = {...props.style,
        height: height,
        display: 'flex',
        flexDirection: 'column-reverse'
    }
    return <div className='form-control' style={style}>
        {msgs.map(m => <div>{m}</div>)}
    </div>
}