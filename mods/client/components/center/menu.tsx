import * as React from 'react'
import { ActionBtnsComponent } from './actionBtns'
import { StatusBarsComponent } from './statusBars'
import { TextDisplayComponent } from './textDisplay'
import { TextInputComponent } from './textInput'

export const CenterMenuComponent: React.FunctionComponent = () => {
    return <div>
        <TextDisplayComponent />
        <StatusBarsComponent />
        <ActionBtnsComponent />
        <TextInputComponent />
    </div>
}