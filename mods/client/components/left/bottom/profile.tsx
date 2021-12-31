import * as React from 'react'
import { useSideWindowHeight } from '../../../hooks'

export const ProfileComponent: React.FunctionComponent = () => {
    const height = useSideWindowHeight()

    return <div style={{height}}>Profile</div>
}