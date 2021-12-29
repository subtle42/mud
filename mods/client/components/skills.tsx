import * as React from 'react'
import Modal from 'react-bootstrap/Modal'
import { useSkills } from '../hooks'



export const SkillsComponent: React.FunctionComponent = () => {
    const [isOpen, setOpen] = React.useState(false)
    const skills = useSkills()

    const getTable = () => {
        return <table style={{width: '100%'}}>
            {skills.map((skill, index) => <div key={index}>
                <tr onClick={() => setOpen(true)}>
                    <td style={{width: 150}}>{skill.name}</td>
                    <td>{skill.level}</td>
                </tr>
            </div>)}
        </table>
    }

    const getModal = () => {
        return <Modal show={isOpen} onHide={() => setOpen(false)}>
            <Modal.Header closeButton>Abilities in ASDF</Modal.Header>
            <Modal.Body>desc</Modal.Body>
        </Modal>
    }

    return <>
        {getTable()}
        {getModal()}
    </>
}