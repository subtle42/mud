import * as React from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

interface Props {
    style?: React.CSSProperties
}

export const ActionBtnsComponent: React.FunctionComponent<Props> = (props) => {
    return <ButtonGroup size='sm' style={props.style}>
        <Button variant='secondary'>action 1</Button>
        <Button variant='secondary'>action 2</Button>
        <Button variant='secondary'>action 3</Button>
        <Button variant='secondary'>action 4</Button>
        <Button variant='secondary'>action 5</Button>
        <Button variant='secondary'>action 6</Button>
        <Button variant='secondary'>action 7</Button>
    </ButtonGroup>
}