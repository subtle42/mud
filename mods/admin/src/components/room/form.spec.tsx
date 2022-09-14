import * as React from 'react'
import '@testing-library/jest-dom'
import { render, RenderResult } from '@testing-library/react'
import { RoomFormComponent } from './form'

describe("RoomComponent", () => {
    let component: RenderResult
    beforeEach(() => {
        component = render(<RoomFormComponent onCancel={() => undefined}/>)
    })

    it('should render', () => {
        expect(component).not.toBeUndefined()
    })

    describe('room list', () => {
        beforeEach(() => {

        })

        it('should show all rooms by default', () => {

        })

        describe('filter', () => {
            it('should only list items that a partial match', () => {

            })
        })
    })
})
