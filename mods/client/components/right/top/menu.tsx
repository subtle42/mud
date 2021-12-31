import * as React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { FaArchway, FaUsers } from 'react-icons/fa'
import { RoomInfoComponent } from './roomInfo'
import { WhoOnlineComponent } from './whoOnline'


export const RightTopMenuComponent: React.FunctionComponent = () => {

    return <Tabs className='mud-tabs'>
    <Tab title={<FaArchway color='white' />} eventKey="room">
        <RoomInfoComponent />
    </Tab>
    <Tab title={<FaUsers color='white' />} eventKey="who">
        <WhoOnlineComponent />
    </Tab>
</Tabs>
}
