import * as React from 'react'
import Modal from 'react-bootstrap/Modal'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { useSideWindowHeight, useSkills } from '../../../hooks'



export const SkillsComponent: React.FunctionComponent = () => {
    const [isOpen, setOpen] = React.useState(false)
    const skills = useSkills()
    const height = useSideWindowHeight()

    const getTable = () => {
        return <ListGroup style={{width: '100%'}}>
            {skills.map((skill, index) => <ListGroupItem key={index}
                action
                onClick={() => setOpen(true)}>
                <span style={{width: 150}}>{skill.name}</span>
                <span>{skill.level}</span>
            </ListGroupItem>)}
        </ListGroup>
    }

    const getModal = () => {
        return <Modal show={isOpen} onHide={() => setOpen(false)}>
            <Modal.Header closeButton>Abilities in ASDF</Modal.Header>
            <Modal.Body>desc</Modal.Body>
        </Modal>
    }

    return <div style={{height}}>
        {getTable()}
        {getModal()}
    </div>
}