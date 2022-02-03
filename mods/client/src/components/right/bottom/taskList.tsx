import * as React from 'react'
import { useSideWindowHeight } from '../../../hooks'

export const TaskListComponent: React.FunctionComponent = () => {
    const height = useSideWindowHeight()

    return <div style={{height}}>Task List</div>
}