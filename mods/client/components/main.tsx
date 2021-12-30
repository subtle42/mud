import * as React from 'react'
import { useWindowDim } from '../hooks'
import { CenterMenuComponent } from './center/menu'
import { LeftBottomMenuComponent } from './left/bottom/menu'
import { LeftTopMenuComponent } from './left/top/menu'
import { RightBottomMenuComponent } from './right/bottom/menu'
import { RightTopMenuComponent } from './right/top/menu'


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
                        <LeftTopMenuComponent />

                    </div>
                    <div style={{height: '50%', paddingTop: 5, paddingLeft: 10, paddingRight:10, paddingBottom: 10}}>
                        <LeftBottomMenuComponent />
                    </div>
                </td>
                <td>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <CenterMenuComponent />
                    </div>
                </td>
                <td style={{width: SIDEBARWIDTH}}>
                    <div style={{height: '50%'}}>
                        <RightTopMenuComponent />
                    </div>
                    <div style={{height: '50%'}}>
                        <RightBottomMenuComponent />
                    </div>
                </td>
            </tr>
        </thead>
    </table>
}