import * as React from 'react'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { FaEdit, FaTrashAlt, FaTimes, FaEye } from 'react-icons/fa'

const useZones = () => [
    'zone1', 'zone2', 'zone3'
]

export const ZoneFormComponent: React.FunctionComponent = () => {
    const [query, setQuery] = React.useState('')
    const zones = useZones().filter(z => z.toLowerCase().includes(query.toLowerCase()))
    const [selected, setSelected] = React.useState()

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
                <h5><Badge>test <FaTimes /></Badge></h5>
                <h5><Badge>test <FaTimes /></Badge></h5>
            </Form.Group>
            <Form.Group className="mb-3">
                <div style={{display:'flex', justifyContent: 'flex-end'}}>
                <Button variant="outline-primary">Save</Button>
                <Button variant="outline-secondary"
                    onClick={() => setSelected(undefined)}>Cancel</Button>

                </div>
            </Form.Group>
        </Form>
    }

    const renderListItem = (item) => {
        return <ListGroupItem key={item} style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
            {item}
            <div>
                <Button variant="outline-info">
                    <FaEye color="info" />
                </Button>
                <Button variant="outline-warning" onClick={() => setSelected({} as any)} >
                    <FaEdit color='warning' />
                </Button>
                <Button variant="outline-danger">
                    <FaTrashAlt color="danger" />
                </Button>
                
            </div>
        </ListGroupItem>
    }

    return <>
        <Offcanvas show={selected} style={{width:500}} onHide={() => setSelected(undefined)}>
            <Offcanvas.Header closeButton>Edit</Offcanvas.Header>
            <Offcanvas.Body>{renderForm()}</Offcanvas.Body>
        </Offcanvas>
        <Form>
            <Form.Group>
                <Form.Label>Search</Form.Label>
                <Form.Control type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}>
                </Form.Control>
            </Form.Group>
        </Form>
        <ListGroup>
            {zones.map(z => renderListItem(z))}
        </ListGroup>
    </>
}