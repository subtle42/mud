import * as React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


interface Props {
    header: string
    message: string
    children?: React.ReactNode
}

export const ConfirmComponent: React.FunctionComponent<Props> = (props: Props) => {
    const [isOpen, setOpen] = React.useState(false)
    const newChildren = React.Children.map(props.children, child => {
        return React.cloneElement(child as any, {
            onClick: (event) => open(event)
        })
    })

    const open = (event: React.FormEvent<any>) => {
        if (event) event.stopPropagation()
        console.log('hi')
        setOpen(true)
    }

    const cancel = () => {
        setOpen(false)
    }

    const close = (event: React.FormEvent<any>) => {
        if (event) event.stopPropagation()
        setOpen(false)
        const tmp: any = props.children
        tmp.props.onClick()
    }

    return <span>
        {newChildren}
        <Modal size='sm'
        show={isOpen}
        onHide={cancel}>
            <Modal.Header>{props.header}</Modal.Header>
            <Modal.Body>{props.message}</Modal.Body>
            <Modal.Footer>
                <Button onClick={close} variant='outline-primary'>Confirm</Button>
                <Button onClick={cancel} variant='outline-secondary'>Cancel</Button>
            </Modal.Footer>
        </Modal>
    </span>
}