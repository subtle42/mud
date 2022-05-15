import * as React from 'react'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { FaEdit, FaTrashAlt, FaTimes, FaEye } from 'react-icons/fa'
import { ConfirmComponent } from '../confirm'
import { createZone } from '../../hooks/actions'

const useZones = () => [
    'zone1', 'zone2', 'zone3'
]

export const ZoneFormComponent: React.FunctionComponent = () => {
    const [query, setQuery] = React.useState('')
    const zones = useZones().filter(z => z.toLowerCase().includes(query.toLowerCase()))
    const [selected, setSelected] = React.useState()

    const sendCreateZone = () => {
        createZone('awefwef')
        .then(() => console.log('done'))
        .catch(err => console.error(err))
    }

    const renderForm = () => {
        if (!selected) return
        return <Form>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <textarea className="form-control"></textarea>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Tags</Form.Label>
                <h5>
                    <Badge>test <FaTimes /></Badge>
                    <Badge>test <FaTimes /></Badge>
                </h5>
            </Form.Group>
            <Form.Group className="mb-3">
                <div style={{display:'flex', justifyContent: 'flex-end'}}>
                    <ConfirmComponent header='Confirm' message='Are you sure you want to save?'>
                        <Button variant="outline-primary" onClick={() => alert('hi')}>Save</Button>
                    </ConfirmComponent>
                    <Button style={{marginLeft: 8}} variant="outline-secondary" onClick={() => setSelected(undefined)}>
                        Cancel
                    </Button>
                </div>
            </Form.Group>
        </Form>
    }

    const renderListItem = (item) => {
        return <ListGroupItem key={item}
            style={{display: 'flex',
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems: 'center'}}>
            {item}
            <div>
                <Button style={{marginLeft: 8}} variant="outline-warning" onClick={() => setSelected({} as any)} >
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

    return <>
        <Offcanvas show={selected} style={{width:500}}>
            <Offcanvas.Header>
                <Offcanvas.Title>Zone Form</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>{renderForm()}</Offcanvas.Body>
        </Offcanvas>
        <Form style={{marginBottom: 15}}>
            <Form.Group className="mb-3">
                <Form.Label>Search</Form.Label>
                <Form.Control type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" style={{display: 'flex', justifyContent: 'center'}}>
                <Button onClick={() => setSelected({} as any)}>Add Zone</Button>
                <Button onClick={() => sendCreateZone()}>Add Zone test</Button>
            </Form.Group>
        </Form>
        <ListGroup>
            {zones.map(z => renderListItem(z))}
        </ListGroup>
    </>
}