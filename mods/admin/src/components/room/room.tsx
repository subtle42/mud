import * as React from 'react'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'
import { FaEdit, FaSearch, FaTrashAlt } from 'react-icons/fa'
import Offcanvas from 'react-bootstrap/Offcanvas'

import { ConfirmComponent } from '../confirm'
import { DirectionComponent } from './direction'
import Badge from 'react-bootstrap/Badge'
import { InputGroup } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'

const DIRECTIONS = ['north', 'south', 'east', 'west', 'up', 'down', 'in', 'out']


export class Room {
    connections:{direction: string, room: string}[] = []
}
const useZones = () => ['asdf1', 'asdf2', 'asdf3']

interface Props {
    style?: React.CSSProperties
    height: number
}

export const RoomFormComponent:React.FC<Props> = (props: Props) => {
    const css: React.CSSProperties = {
        overflowY: 'scroll',
        border: 'none',
        height: props.height
    }
    const zones = useZones()
    const [room, setRoom]: [Room, (a: Room|undefined)=>void] = React.useState(undefined as any)
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
                    onClick={() => setRoom(new Room())}>
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

    const renderConnectionItem = (item):JSX.Element => {
        return <div style={{display:'flex'}}>
            <Form.Select value={item.direction} style={{marginRight:8}} onChange={() => console.log('')}>
                {DIRECTIONS.filter(dir => {
                    if (dir === item.direction) return true
                    return !room.connections.find(x => x.direction === dir)
                }).map(dir => <option key={dir} value={dir}>{dir}</option>)}
            </Form.Select>
            <Form.Select style={{marginRight:8}} onChange={() => console.log('')}></Form.Select>
            <Button variant='outline-danger'><FaTrashAlt /></Button>
        </div>
    }

    const addDirection = (dir) => {
        room.connections.push(dir)
        setRoom({...room})
    }

    const renderForm = ():JSX.Element => {
        if (!room) return <></>
        return <Form>
            <Form.FloatingLabel label='Name' controlId='name-ctrl' className="mb-3">
                <Form.Control type='text' placeholder='Name' />
            </Form.FloatingLabel>
            <Form.FloatingLabel label='Description' controlId='desc-ctrl' className="mb-3">
                <Form.Control as='textarea' placeholder='Desc' style={{height: 200}} />
            </Form.FloatingLabel>
            <DirectionComponent onAdd={addDirection} room={room} />
            <hr />
            <Form.Group className="mb-3">
                <ListGroup>
                    {room.connections.map(conn => renderConnectionItem(conn))}
                </ListGroup>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Tags</Form.Label>
            </Form.Group>
            <Button variant='outline-primary'>Save</Button>
            <Button variant='outline-secondary' onClick={() => setRoom(undefined)}>Cancel</Button>
        </Form>
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

        <Offcanvas style={{width: 600}} show={room}>
            <Offcanvas.Header>
                <Offcanvas.Title>Area Form</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {renderForm()}
            </Offcanvas.Body>
        </Offcanvas>
    </div>
}