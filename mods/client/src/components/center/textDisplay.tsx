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
        overflowY: 'scroll',
        flexDirection: 'column-reverse'
    }
    return <div className='form-control' style={style}>
        {msgs.map((m, index) => <div key={index} dangerouslySetInnerHTML={{__html:m}}></div>)}
    </div>
}