import * as React from 'react'
import { useSideWindowHeight } from '../../../hooks'

export const InventoryComponent: React.FunctionComponent = () => {
    const height = useSideWindowHeight()

    return <div style={{height}}>Inventory</div>
}