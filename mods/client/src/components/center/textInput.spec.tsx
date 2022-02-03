import '@testing-library/jest-dom'
import * as sinon from 'sinon'
import * as io from 'socket.io-client'
import * as React from 'react'
import {render, fireEvent, waitFor, screen, RenderResult} from '@testing-library/react'


import { TextInputComponent } from './textInput'


describe('TextInputComponent', () => {
    const sandbox = sinon.createSandbox()
    let component: RenderResult


    beforeEach(() => {
        const ioReturn: any = {
            emit: sandbox.spy()
        }

        // sandbox.stub(io, 'default').returns(ioReturn)
        component = render(<TextInputComponent />)
    })

    describe('init state', () => {
        it('should be empty', () => {
            expect(component.getByPlaceholderText('cmd').getAttribute('value')).toEqual('')
            // fireEvent.change(component.getByPlaceholderText('cmd'), {})
        
            // expect(component.find('input').prop('value')).toEqual('')
        })
    })

    describe('input command', () => {
        it.todo('should NOT send message if input is empty')
        it.todo('should send message if input is NOT empty')
    })
})