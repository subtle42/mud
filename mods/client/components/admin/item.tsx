import * as React from 'react'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const useItems = () => {
    return ['item1','item2']
}

export const AdminItemsComponent: React.FunctionComponent = () => {
    const [query, setQuery] = React.useState('')
    const [isOpen, setOpen] = React.useState(false)
    const [selected, setSelected] = React.useState({})
    const items = useItems()
        .filter(i => (i.toLowerCase()).includes(query.toLowerCase()))

    const renderModal = ():JSX.Element => {
        return <Modal show={isOpen} onHide={()=>setOpen(false)}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>Edit item</Modal.Body>
            <Modal.Footer>
                <Button color='secondary'>Cancel</Button>
                <Button color='primary'>Save</Button>
            </Modal.Footer>
        </Modal>
    }

    const renderInput = ():JSX.Element => {
        return <Form>
            <Form.Control 
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
        </Form>
    }

    const renderList = ():JSX.Element => {
        return <ListGroup>
            {items.map(i => {
                return <ListGroupItem>{i}</ListGroupItem>
            })}
        </ListGroup>
    }

    return <>
        {renderModal()}
        {renderInput()}
        {renderList()}
    </>
}