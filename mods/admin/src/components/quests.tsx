import * as React from 'react'
import { Collapse, Form, FormGroup, ListGroup, Offcanvas } from 'react-bootstrap'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'


class Quest {
    name: string = ""
}

interface Props {
    style?: React.CSSProperties
}

const useQuests = ():Quest[] => [{name: 'asdf'}]

export const QuestComponent: React.FC<Props> = (props) => {
    const [quest, setQuest] = React.useState<Quest|undefined>(undefined)
    const [open, setOpen] = React.useState(false)
    const questList = useQuests()


    const renderForm = (): JSX.Element => {
        if (!quest) return <div></div>
        return <Form></Form>
    }

    const renderItem = (item: Quest): JSX.Element => {
        return <ListGroup.Item key={item.name}>
            {item.name}
        </ListGroup.Item>
    }

    const renderList = () => {
        return <ListGroup>
            <ListGroup.Item onClick={() => setOpen(!open)}>
                Quests
                {open ? <FaChevronDown /> : <FaChevronUp />}
            </ListGroup.Item>
            <Collapse in={open}>
                <div>
                    {questList.map(q => renderItem(q))}
                </div>
            </Collapse>
        </ListGroup>
    }

    return <>
        <Offcanvas show={quest}>
            {renderForm()}
        </Offcanvas>

        {renderList()}
    </>
}