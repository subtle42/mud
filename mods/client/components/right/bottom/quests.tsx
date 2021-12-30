import * as React from 'react'
import Collapse from 'react-bootstrap/Collapse'
import { useSideWindowHeight } from '../../../hooks'

const useQuests = () => {
    return []
}

export const QuestComponent: React.FunctionComponent = () => {
    const quests = useQuests()
    const height = useSideWindowHeight()

    return <div style={{height}}>

    </div>
}