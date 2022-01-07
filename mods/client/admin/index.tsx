import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ZoneFormComponent } from './zone'
import { NavComponent } from './nav'
import './admin.style.sass'
import { RoomFormComponent } from './room'

render( <div>
    <BrowserRouter>
    <NavComponent />
        <Routes>
            <Route path="/" element={<ZoneFormComponent />} />
            <Route path="rooms" element={<RoomFormComponent />} />
        </Routes>
    </BrowserRouter>
</div>, document.getElementById('root'))