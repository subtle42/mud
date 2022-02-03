import * as React from 'react'
import { ActionBtnsComponent } from './actionBtns'
import { StatusBarsComponent } from './statusBars'
import { TextDisplayComponent } from './textDisplay'
import { TextInputComponent } from './textInput'

const style: React.CSSProperties = {
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5
}

export const CenterMenuComponent: React.FunctionComponent = () => {

    return <div>
        <TextDisplayComponent style={{...style, marginBottom: 5}} />
        <StatusBarsComponent style={style} />
        <ActionBtnsComponent style={style} />
        <TextInputComponent style={style} />
    </div>
}