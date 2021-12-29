import * as React from 'react'
import { useWindowDim } from '../hooks'
import { ActionBtnsComponent } from './actionBtns'
import { BottomLeftMenuComponent } from './bottomLeftMenu'
import { StatusBarsComponent } from './statusBars'
import { TextDisplayComponent } from './textDisplay'
import { TextInputComponent } from './textInput'
import { TopLeftMenuComponent } from './topLeftMenu'
import { TopRightMenuComponent } from './topRightMenu'

const SIDEBARWIDTH = 300

export const MainComponent: React.FunctionComponent = () => {
    const pageHeight = useWindowDim().y
    const midStyle: React.CSSProperties = {
        paddingTop: 10,
        paddingBottom: 10
    }

    return <table style={{width:'100%', height: pageHeight}}>
        <thead>
            <tr>
                <td style={{width: SIDEBARWIDTH}}>
                    <div style={{height: '50%', paddingTop: 10, paddingLeft: 10, paddingRight:10, paddingBottom: 5}}>
                        <TopLeftMenuComponent />

                    </div>
                    <div style={{height: '50%', paddingTop: 5, paddingLeft: 10, paddingRight:10, paddingBottom: 10}}>
                        <BottomLeftMenuComponent />
                    </div>
                </td>
                <td>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <TextDisplayComponent style={{...midStyle, marginBottom: 10}} />
                        <StatusBarsComponent />
                        <ActionBtnsComponent style={midStyle} />
                        <TextInputComponent style={midStyle} />
                    </div>
                    
                </td>
                <td style={{width: SIDEBARWIDTH}}>
                    <div>
                        <TopRightMenuComponent />
                    </div>
                </td>
            </tr>
        </thead>
    </table>
}