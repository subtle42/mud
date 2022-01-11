import * as React from 'react'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Offcanvas from 'react-bootstrap/Offcanvas'

import { ConfirmComponent } from '../confirm'
import { DirectionComponent } from './direction'

const DIRECTIONS = ['north', 'south', 'east', 'west', 'up', 'down', 'in', 'out']


export class Room {
    connections:{direction: string, room: string}[] = []
}
const useZones = () => ['asdf1', 'asdf2', 'asdf3']

export const RoomFormComponent:React.FunctionComponent = () => {
    const zones = useZones()
    const [zone, setZone] = React.useState(zones[0])
    const [room, setRoom]: [Room, (a: Room|undefined)=>void] = React.useState(undefined as any)

    const renderListItem = (item):JSX.Element => {
        return <ListGroupItem key={item}
            style={{display: 'flex',
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems: 'center'}}>
            {item}
            <div>
                <Button style={{marginLeft: 8}} variant="outline-warning" onClick={() => setRoom(new Room())} >
                    <FaEdit color='warning' />
                </Button>
                <ConfirmComponent header={`Delete ${item}`} message='Are you sure you want to delete?'>
                    <Button style={{marginLeft:8}} variant="outline-danger">
                        <FaTrashAlt color="danger" />
                    </Button>
                </ConfirmComponent>
            </div>
        </ListGroupItem>
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
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type='text'></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <textarea className='form-control'></textarea>
            </Form.Group>
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

    return <>
        <Offcanvas style={{width: 600}} show={room}>
            <Offcanvas.Header>
                <Offcanvas.Title>Area Form</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {renderForm()}
            </Offcanvas.Body>
        </Offcanvas>

        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Zone</Form.Label>
                <Form.Select onChange={e => setZone(e.target.value)}>
                    {zones.map(z => <option key={z} value={z}>{z}</option>)}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" style={{display: 'flex', justifyContent: 'center'}}>
                <Button disabled={zone === ''} onClick={() => setRoom(new Room())}>Add Room</Button>
            </Form.Group>
        </Form>

        <ListGroup>
            {renderListItem('asdf')}
        </ListGroup>
    </>
}