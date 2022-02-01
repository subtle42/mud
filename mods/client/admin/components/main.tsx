import * as React from 'react'
import { useSideWindowHeight } from '../hooks'
import { AdminItemsComponent } from './item/item'
import { MobComponent } from './mob/mob'



export const MainComponent: React.FC = () => {
    const height = useSideWindowHeight()
    const css: React.CSSProperties = {
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
    }

    return <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{width: '100%'}}>
            <MobComponent style={css} height={height} />
            <AdminItemsComponent style={css} height={height} />
        </div>
        <div style={{width: '100%'}}>
            <MobComponent style={css} height={height} />
            <AdminItemsComponent style={css} height={height} />
        </div>
    </div>
}