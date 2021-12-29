import * as React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { FaGlobe } from 'react-icons/fa'


export const LeftTopMenuComponent: React.FunctionComponent = () => {

    return <Tabs>
        <Tab title={<FaGlobe color='white' />} eventKey="map">
            map
        </Tab>
    </Tabs>
}