import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { NavComponent } from './components/nav'
import { ZoneFormComponent } from './components/zone/zone'
import { RoomFormComponent } from './components/room/room'
import './admin.style.sass'

render(<BrowserRouter>
    <NavComponent />
        <div style={{display:'flex', justifyContent:'center'}}>
        <div style={{width: 600}}>
        <Routes>
            <Route path="/" element={<ZoneFormComponent />} />
            <Route path="zones" element={<ZoneFormComponent />} />
            <Route path="rooms" element={<RoomFormComponent />} />
        </Routes>
        </div>
        </div>
    </BrowserRouter>
, document.getElementById('root'))