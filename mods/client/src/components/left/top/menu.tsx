import * as React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { FaGlobe } from 'react-icons/fa'
import { MapComponent } from './map'


export const LeftTopMenuComponent: React.FunctionComponent = () => {

    return <Tabs className='mud-tabs'>
        <Tab title={<FaGlobe color='white' />} eventKey="map">
            <MapComponent />
        </Tab>
    </Tabs>
}