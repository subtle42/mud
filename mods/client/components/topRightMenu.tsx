import * as React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { FaArchway, FaUsers } from 'react-icons/fa'
import { RoomInfoComponent } from './roomInfo'


export const TopRightMenuComponent: React.FunctionComponent = () => {

    return <Tabs>
    <Tab title={<FaArchway color='white' />} eventKey="room">
        <RoomInfoComponent />
    </Tab>
    <Tab title={<FaUsers color='white' />} eventKey="who">
        <RoomInfoComponent />
    </Tab>
</Tabs>
}
