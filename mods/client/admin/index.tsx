import * as React from 'react'
import { render } from 'react-dom'
import { ZoneFormComponent } from './zone'
import './admin.style.sass'
import { NavComponent } from './nav'

render( <div>
    <NavComponent />
    <ZoneFormComponent />
</div>, document.getElementById('root'))