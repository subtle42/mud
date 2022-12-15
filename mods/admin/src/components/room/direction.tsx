import * as React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Room } from './index'

const DIRECTIONS = ['north', 'south', 'east', 'west', 'up', 'down', 'in', 'out']

interface Props {
    room: Room
    onAdd: (input) => void
}

export const DirectionComponent: React.FunctionComponent<Props> = (props) => {
    const {room} = props
    const [direction, setDirection] = React.useState('')
    const [name, setName] = React.useState('')

    const add = () => {
        props.onAdd({
            direction,
            room: name
        })
        setName('')
        setDirection('')
    }

    const renderDirectionDD = () => {}

    return <Form.Group className="mb-3">
        <Form.Label>Connections</Form.Label>
        <div style={{display:'flex'}}>
            <div style={{marginRight:8, width: 150}}>
                <Form.Label>Direction</Form.Label>
                <Form.Select value={direction} onChange={e => setDirection(e.target.value)}>
                    {DIRECTIONS.filter(dir => {
                        if (!room) return
                        return !room.connections.find(x => x.direction === dir)
                    })
                    .map(dir => <option key={dir} value={dir}>{dir}</option>)}
                </Form.Select>
            </div>
            <div style={{marginRight:8, width: '100%'}}>
                <Form.Label>Room</Form.Label>
                <Form.Select value={name} onChange={e => setName(e.target.value)}>
                    <option value='1'>name1</option>
                    <option value='2'>name2</option>
                    <option value='3'>name3</option>
                </Form.Select>
            </div>
            <Button style={{marginTop: 32}} onClick={() => add()}>
                Add
            </Button>
        </div>
    </Form.Group>
}