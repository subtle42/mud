import * as React from 'react'
import Form from 'react-bootstrap/Form'

export const RoomFormComponent:React.FunctionComponent = () => {
    const [room, setRoom] = React.useState({} as any)

    const handleChange = (e) => {
        setRoom({...room, [e.target.name]: e.target.value})
    }

    return <Form>
        <Form.Group>
            <Form.Label>asf</Form.Label>
            <Form.Control type="text"
                name="name"
                value={room.name}
                onChange={e => setRoom({...room, name: e.target.value})}>
            </Form.Control>
        </Form.Group>

        <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control type="area"
                name="desc"
                value={room.desc}
                onChange={handleChange}>
            </Form.Control>
        </Form.Group>

        <Form.Group>
            <Form.Label>Tags</Form.Label>
            
        </Form.Group>
    </Form>
}