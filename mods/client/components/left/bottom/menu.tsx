import * as React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { FaUser, FaBookOpen } from 'react-icons/fa'
import { GiKnapsack } from 'react-icons/gi'
import { SkillsComponent } from './skills'


export const LeftBottomMenuComponent: React.FunctionComponent = () => {
    return <Tabs>
        <Tab style={{height:400}} title={<FaUser color='white' />} eventKey="character">
            map
        </Tab>
        <Tab title={<FaBookOpen color='white' />} eventKey="skills">
            <SkillsComponent />
        </Tab>
        <Tab title={<GiKnapsack color='white' />} eventKey="inventory">
            map
        </Tab>
    </Tabs>
}