import * as React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { FaEdit, FaSearch, FaTrashAlt } from 'react-icons/fa'
import Offcanvas from 'react-bootstrap/Offcanvas'

import { ConfirmComponent } from '../confirm'
import Badge from 'react-bootstrap/Badge'
import { InputGroup } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { RoomFormComponent } from './form'


export class Room {
    connections:{direction: string, room: string}[] = []
}
const useZones = () => ['asdf1', 'asdf2', 'asdf3']

interface Props {
    style?: React.CSSProperties
    height: number
}

export const RoomComponent:React.FC<Props> = (props: Props) => {
    const css: React.CSSProperties = {
        overflowY: 'scroll',
        border: 'none',
        height: props.height
    }
    const zones = useZones()
    const [formOpen, setFormOpen] = React.useState(false)
    const [query, setQuery] = React.useState('')

    const renderItem = (item):JSX.Element => {
        return <ListGroup.Item
            key={item}
            style={{display: 'flex',
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems: 'center'}}>
            {item}
            <div>
                <Button style={{marginLeft: 8}}
                    variant="outline-warning"
                    size='sm'
                    onClick={() => setFormOpen(true)}>
                    <FaEdit />
                </Button>
                <ConfirmComponent header={`Delete ${item}`} message='Are you sure you want to delete?'>
                    <Button size='sm' style={{marginLeft:8}}
                        variant="outline-danger">
                        <FaTrashAlt />
                    </Button>
                </ConfirmComponent>
            </div>
        </ListGroup.Item>
    }

    const renderForm = ():JSX.Element => {
        if (!formOpen) return <></>
        return <RoomFormComponent onCancel={() => setFormOpen(false)} />
    }

    const renderSearch = ():JSX.Element => {
        return <InputGroup onClick={e => e.stopPropagation()}>
            <InputGroup.Text id="basic-addon1"><FaSearch /></InputGroup.Text>
            <FormControl aria-describedby="basic-addon1"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
        </InputGroup>
    }

    return <div style={props.style}>
        <h4>Rooms <Badge bg="secondary">{8}</Badge></h4>
        {renderSearch()}
        <ListGroup style={css}>
            {[1,2,3,4,5,6,7,8].map(i => renderItem(i))}
        </ListGroup>

        <Offcanvas style={{width: 600}} show={formOpen}>
            <Offcanvas.Header>
                <Offcanvas.Title>Area Form</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {renderForm()}
            </Offcanvas.Body>
        </Offcanvas>
    </div>
}