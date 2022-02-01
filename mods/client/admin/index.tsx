import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { NavComponent } from './components/nav'
import { ZoneFormComponent } from './components/zone/zone'
import { RoomFormComponent } from './components/room/room'
import { MobComponent } from './components/mob/mob'
import './admin.style.sass'
import { QuestComponent } from './components/quests'
import { MainComponent } from './components/main'

render(<BrowserRouter>
    <NavComponent />
        <div style={{display:'flex', justifyContent:'center'}}>
        <div style={{width: 900}}>
        <Routes>
            <Route path="/" element={<MainComponent />} />
            <Route path="zones" element={<ZoneFormComponent />} />
            <Route path="rooms" element={<RoomFormComponent />} />
            <Route path="quests" element={<QuestComponent />} />
        </Routes>
        </div>
        </div>
    </BrowserRouter>
, document.getElementById('root'))