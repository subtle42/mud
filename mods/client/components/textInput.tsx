import * as React from 'react'
import Form from 'react-bootstrap/Form'
import { getNextCmd, getPrevCmd, sendCmd } from '../actions'

interface Props {
    style?: React.CSSProperties
}

export const TextInputComponent: React.FunctionComponent<Props> = (props) => {
    const [input, setInput] = React.useState('')
    const textRef: any = React.useRef(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        sendCmd(input)
        textRef.current.select()
    }

    const handleKeypress = (e: React.KeyboardEvent<any>) => {
        if (e.key.toLowerCase() === 'arrowup') {
            setInput(getPrevCmd())
            textRef.current.select()
        } else if (e.key.toLowerCase() === 'arrowdown') {
            setInput(getNextCmd())
            textRef.current.select()
        }
    }

    return <Form onSubmit={handleSubmit} style={props.style}>
        <Form.Control type="text"
            ref={textRef}
            placeholder="Cmd"
            value={input}
            onKeyDown={handleKeypress}
            onFocus={e => e.target.select()}
            onChange={e => setInput(e.target.value)} />
    </Form>
}