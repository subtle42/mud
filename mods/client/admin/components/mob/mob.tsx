import * as React from 'react'
import Collapse from 'react-bootstrap/Collapse'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { FaEdit, FaTrashAlt, FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { ConfirmComponent } from '../confirm'


class Mob {}

export const MobComponent: React.FC = () => {
    const [selected, setSelected] = React.useState<Mob|undefined>(undefined)
    const [isOpen, setOpen] = React.useState(false)

    const renderForm = ():JSX.Element => {
        if (!selected) return <></>
        return <Form>
            <Form.FloatingLabel label='Name' controlId='namecontrol' className='mb-3'>
                <Form.Control type="text" placeholder='Name'></Form.Control>
            </Form.FloatingLabel>
            <Form.Group>
                <Form.Label>Wanders</Form.Label>
                <Form.Check type='checkbox'></Form.Check>
            </Form.Group>
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
                    onClick={() => setSelected(new Mob())}>
                    <FaEdit />
                </Button>
                <ConfirmComponent header={`Delete ${item}`} message='Are you sure you want to delete?'>
                    <Button style={{marginLeft:8}}
                        variant="outline-danger">
                        <FaTrashAlt />
                    </Button>
                </ConfirmComponent>
            </div>
        </ListGroup.Item>
    }

    return <>
        <ListGroup>
            <ListGroup.Item style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} onClick={() => setOpen(!isOpen)}>
                Mobs
                {isOpen ? <FaChevronDown /> : <FaChevronUp />}
            </ListGroup.Item>
            <Collapse in={isOpen}>
                <div>
                    {[1,2,3].map(i => renderItem(i))}
                </div>
            </Collapse>
        </ListGroup>

        <Offcanvas show={selected}>
            {renderForm()}
        </Offcanvas>
    </>
}