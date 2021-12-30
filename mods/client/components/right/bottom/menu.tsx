import * as React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { FaExclamationCircle, FaTasks } from 'react-icons/fa'
import { QuestComponent } from './quests'


export const RightBottomMenuComponent: React.FunctionComponent = () => {
    return <Tabs className='mud-tabs'>
        <Tab title={<FaExclamationCircle color='white' />} eventKey="quests">
            <QuestComponent />
        </Tab>
        <Tab title={<FaTasks color='white' />} eventKey="tasks">
            Tasks
        </Tab>
    </Tabs>
}