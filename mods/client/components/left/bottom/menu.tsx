import * as React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { FaUser, FaBookOpen } from 'react-icons/fa'
import { GiKnapsack } from 'react-icons/gi'
import { SkillsComponent } from './skills'
import { InventoryComponent } from './inventory'
import { ProfileComponent } from './profile'


export const LeftBottomMenuComponent: React.FunctionComponent = () => {
    return <Tabs className='mud-tabs'>
        <Tab title={<FaUser color='white' />} eventKey="character">
            <ProfileComponent />
        </Tab>
        <Tab title={<FaBookOpen color='white' />} eventKey="skills">
            <SkillsComponent />
        </Tab>
        <Tab title={<GiKnapsack color='white' />} eventKey="inventory">
            <InventoryComponent />
        </Tab>
    </Tabs>
}