import * as React from 'react'
import Collapse from 'react-bootstrap/Collapse'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import { useSideWindowHeight, useWindowDim } from '../../../hooks'

const currRoom = () => ''
const usePlayersInRoom = () => {
    const [players, setPlayers] = React.useState([
        'daniel', 'pamela',
    ]) 
    return players
}

const useItemsInRoom = () => {
    return []
}


interface ExpandOpts {
    list: any[]
    label: string
}

const Expandable:React.FunctionComponent<ExpandOpts> = (props) => {
    const [isOpen, setOpen] = React.useState(true)
    const {label, list} = props
    
    const getExpandIcon = (isOpen: boolean): JSX.Element => {
        if (!isOpen) return <FaPlusCircle color='red' />
        return <FaMinusCircle color='red' />
    }
    
    return <div>
        <div onClick={() => setOpen(!isOpen)}
            aria-controls={label}
            style={{color: 'yellow'}}>
        <b>{getExpandIcon(isOpen)} {label}</b></div>
        <Collapse in={isOpen}>
            <div id={label} style={{color: 'gold'}}>{
                list.map(p => <div>{p}</div>)
            }</div>
        </Collapse>
    </div>
}

export const RoomInfoComponent: React.FunctionComponent = () => {
    const players = usePlayersInRoom()
    const items = useItemsInRoom()
    const height = useSideWindowHeight()

    return <div style={{height, overflowY: 'scroll'}}>
        <Expandable label="Players" list={players} />
        <Expandable label="Mobs" list={players} />
        <Expandable label="Items" list={items} />
    </div>
}