import * as React from 'react'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Offcanvas from 'react-bootstrap/Offcanvas'

import { ConfirmComponent } from '../components/confirm'


export const RoomFormComponent:React.FunctionComponent = () => {
    const [zone, setZone] = React.useState('')
    const [area, setArea] = React.useState(undefined)


    const renderListItem = (item):JSX.Element => {
        return <ListGroupItem key={item}
            style={{display: 'flex',
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems: 'center'}}>
            {item}
            <div>
                <Button style={{marginLeft: 8}} variant="outline-warning" onClick={() => setArea({} as any)} >
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

    const renderConnectionItem = ():JSX.Element => {
        return <div style={{display:'flex'}}>
            <Form.Select style={{marginRight:8}}></Form.Select>
            <Form.Select style={{marginRight:8}}></Form.Select>
            <Button variant='outline-danger'><FaTrashAlt /></Button>
        </div>
    }

    const renderForm = ():JSX.Element => {
        return <Form>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type='text'></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <textarea className='form-control'></textarea>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Connections</Form.Label>
                <div style={{display:'flex'}}>
                    <Form.Select style={{marginRight:8}}></Form.Select>
                    <Form.Select style={{marginRight:8}}></Form.Select>
                    <Button>Add</Button>
                </div>
            </Form.Group>
            <hr />
            <Form.Group className="mb-3">
                <ListGroup>
                    {renderConnectionItem()}
                </ListGroup>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Tags</Form.Label>
            </Form.Group>
            <Button variant='outline-primary'>Save</Button>
            <Button variant='outline-secondary' onClick={() => setArea(undefined)}>Cancel</Button>
        </Form>
    }

    return <>
        <Offcanvas style={{width: 600}} show={area}>
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
                    <option value={1}>zone1</option>
                    <option value={2}>zone2</option>
                    <option value={3}>zone3</option>
                    <option value={4}>zone4</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" style={{display: 'flex', justifyContent: 'center'}}>
                <Button disabled={zone === ''} onClick={() => setArea({} as any)}>Add Room</Button>
            </Form.Group>
        </Form>

        <ListGroup>
            {renderListItem('asdf')}
        </ListGroup>
    </>
}