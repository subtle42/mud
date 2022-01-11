import * as React from 'react'
import { render } from 'react-dom'
import { MainComponent } from './components/main'

import './style.sass'

render( <div>
    <MainComponent />
</div>, document.getElementById('root'))