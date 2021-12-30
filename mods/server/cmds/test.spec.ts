import * as cmd from '.'

describe('buildCmd', () => {
    afterEach(() => {
        cmd.cmdStore.dispatch({type: 'RESET'})
    })

    describe('name and handler', () => {
        it('should add the command to the store', () => {
            expect(Object.keys(cmd.cmdStore.getState()).length).toEqual(0)
            cmd.buildCmd('test', () => {})
            expect(Object.keys(cmd.cmdStore.getState()).length).toEqual(1)
        })
    })

    describe('name, opts, and handler', () => {
        it('should add the command to the store', () => {
            expect(Object.keys(cmd.cmdStore.getState()).length).toEqual(0)
            cmd.buildCmd('test', () => {})
            expect(Object.keys(cmd.cmdStore.getState()).length).toEqual(1)
        })

        it.todo('should add a command for each alias to the store')
    })

    describe('name, builder, and handler', () => {
        it.todo('should add the command to the store')
        it.todo('should add all options to the command')
    })

    describe('name, opts, builder, and handler', () => {
        it.todo('should add the command to the store')
        it('should add an item for each alias', () => {
            expect(Object.keys(cmd.cmdStore.getState()).length).toEqual(0)
            cmd.buildCmd('test', {
                alias: ['a','b']
            }, () => {}, () => {})
            expect(Object.keys(cmd.cmdStore.getState()).length).toEqual(3)
        })
        it.todo('should add all options to the command')
    })
})

describe('runCmd', () => {

    // beforeEach(() => {})
    // afterEach(() => cmd.cmdStore.dispatch({type: 'RESET'}))
    describe('cmd NOT found', () => {
        it.todo('should call ack with an error msg')
        it.todo('should NOT try to call a handler')
    })
    describe('options', () => {

    })

    describe('handler function', () => {
        describe('inputs object', () => {
            describe('$0', () => {
                it.todo('should be the name of the command')
                it.todo('should be the name of the command if input was an alias')
            })
            
            describe('_', () => {
                it.todo('should be an empty list if no extra input')
                it.todo('should have inputs that are NOT part of options')
            })

            describe('opt keys', () => {
                
            })
        })
    })
})