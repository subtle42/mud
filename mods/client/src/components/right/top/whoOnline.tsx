import * as React from 'react'
import { useSideWindowHeight } from '../../../hooks'

export const WhoOnlineComponent: React.FunctionComponent = () => {
    const height = useSideWindowHeight()

    return <div style={{height}}>Who</div>
}
