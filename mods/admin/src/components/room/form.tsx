import * as React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { DirectionComponent } from './direction'
import { Room } from './index'
import { FaTrashAlt } from 'react-icons/fa'

interface Props {
    onCancel: () => void
}

const DIRECTIONS = ['north', 'south', 'east', 'west', 'up', 'down', 'in', 'out']


export const RoomFormComponent: React.FC<Props> = (props) => {
    const [room, setRoom] = React.useState(new Room())

    const addDirection = (dir) => {
        room.connections.push(dir)
        setRoom({...room})
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
        <Button variant='outline-secondary' onClick={() => props.onCancel()}>Cancel</Button>
    </Form>
}