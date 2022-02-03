import * as React from 'react'
import { useSideWindowHeight } from '../../../hooks'

export const MapComponent: React.FunctionComponent = () => {
    const height = useSideWindowHeight()
    return <div style={{height}}>Map</div>
}