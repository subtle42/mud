import * as React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Badge, FormControl, InputGroup } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'

const useItems = () => {
    return [
        'item1','item2',
        'item1','item2',
        'item1','item2',
        'item1','item2',
        'item1','item2',
    ]
}

interface Props {
    style?: React.CSSProperties
    height: number
}

export const AdminItemsComponent: React.FC<Props> = (props) => {
    const [query, setQuery] = React.useState('')
    const [isOpen, setOpen] = React.useState(false)
    const [selected, setSelected] = React.useState({})
    const items = useItems()
        .filter(i => (i.toLowerCase()).includes(query.toLowerCase()))

    const renderModal = ():JSX.Element => {
        return <Modal centered show={isOpen} onHide={()=>setOpen(false)}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>Edit item</Modal.Body>
            <Modal.Footer>
                <Button color='secondary'>Cancel</Button>
                <Button color='primary'>Save</Button>
            </Modal.Footer>
        </Modal>
    }

    const renderInput = ():JSX.Element => {
        return <InputGroup onClick={e => e.stopPropagation()}>
        <InputGroup.Text id="basic-addon1"><FaSearch /></InputGroup.Text>
            <FormControl aria-describedby="basic-addon1"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
        </InputGroup>
    }

    const renderList = ():JSX.Element => {
        return <ListGroup style={{overflowY: 'scroll', height: props.height}}>
            {items.map((i, index) => {
                return <ListGroupItem key={index}>{i}</ListGroupItem>
            })}
        </ListGroup>
    }

    return <div style={props.style}>
        <h4>Items <Badge bg="secondary">{useItems().length}</Badge></h4>
        {renderModal()}
        {renderInput()}
        {renderList()}
    </div>
}