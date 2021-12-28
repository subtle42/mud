import * as React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { FaUser, FaBookOpen } from 'react-icons/fa'
import { GiKnapsack } from 'react-icons/gi'


export const BottomLeftMenuComponent: React.FunctionComponent = () => {
    return <Tabs>
        <Tab style={{height:400}} title={<FaUser color='white' />} eventKey="character">
            map
        </Tab>
        <Tab title={<FaBookOpen color='white' />} eventKey="skills">
            map
        </Tab>
        <Tab title={<GiKnapsack color='white' />} eventKey="inventory">
            map
        </Tab>
    </Tabs>
}