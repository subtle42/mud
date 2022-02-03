import * as React from 'react'
import Collapse from 'react-bootstrap/Collapse'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { FaEdit, FaTrashAlt, FaChevronUp, FaChevronDown, FaSearch } from 'react-icons/fa'
import { ConfirmComponent } from '../confirm'
import { Badge, FormControl, InputGroup } from 'react-bootstrap'


class Mob {}

interface Props {
    style?: React.CSSProperties
    height: number
}

export const MobComponent: React.FC<Props> = (props) => {
    const [selected, setSelected] = React.useState<Mob|undefined>(undefined)
    const css: React.CSSProperties = {
        overflowY: 'scroll',
        border: 'none',
        height: props.height
    }

    const renderForm = ():JSX.Element => {
        if (!selected) return <></>
        return <Form style={{padding:17}}>
            <Form.FloatingLabel label='Name' controlId='namecontrol' className='mb-3'>
                <Form.Control type="text" placeholder='Name'>
                </Form.Control>
            </Form.FloatingLabel>
            <Form.Group>
                <Form.Label>Wanders</Form.Label>
                <Form.Check type='checkbox'></Form.Check>
            </Form.Group>
            <Form.Group></Form.Group>
            <div>
                <Button variant="outline-primary">Save</Button>
                <Button variant="outline-secondary" onClick={() => setSelected(undefined)}>Cancel</Button>
            </div>
        </Form>
    }

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
                    onClick={() => setSelected(new Mob())}>
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

    const renderSearch = ():JSX.Element => {
        return <InputGroup onClick={e => e.stopPropagation()}>
            <InputGroup.Text id="basic-addon1"><FaSearch /></InputGroup.Text>
            <FormControl aria-describedby="basic-addon1"/>
        </InputGroup>
    }

    return <div style={props.style}>
        <h4>Mobs <Badge bg="secondary">{8}</Badge></h4>
        {renderSearch()}
        <ListGroup style={css}>
            {[1,2,3,4,5,6,7,8].map(i => renderItem(i))}
        </ListGroup>
        <Offcanvas show={selected}>
            {renderForm()}
        </Offcanvas>
    </div>
}