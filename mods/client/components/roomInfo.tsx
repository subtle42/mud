import * as React from 'react'
import Collapse from 'react-bootstrap/Collapse'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'

const currRoom = () => ''
const usePlayersInRoom = () => {
    const [players, setPlayers] = React.useState([
        'daniel', 'pamela'
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
        if (!isOpen) return <FaPlusCircle color='yellow' />
        return <FaMinusCircle color='yellow' />
    }
    
    return <div>
        <div onClick={() => setOpen(!isOpen)}
            aria-controls={label}>
        {getExpandIcon(isOpen)} {label}</div>
        <Collapse in={isOpen}>
            <div id={label}>{
                list.map(p => <div>{p}</div>)
            }</div>
        </Collapse>
    </div>
}

export const RoomInfoComponent: React.FunctionComponent = () => {
    const players = usePlayersInRoom()
    const items = useItemsInRoom()

    return <div>
        <Expandable label="Players" list={players} />
        <Expandable label="Mobs" list={players} />
        <Expandable label="Items" list={items} />
    </div>
}