import * as cmd from '.'
import { mock, SinonMock } from 'sinon'

const emptyFn = () => {}

describe('buildCmd', () => {
    afterEach(() => {
        cmd.cmdStore.dispatch({type: 'RESET'})
    })

    describe('name and handler', () => {
        it('should add the command to the store', () => {
            const cmdName = 'awekfjawlejfa'
            cmd.buildCmd(cmdName, emptyFn)
            expect(cmd.cmdStore.getState()[cmdName]).not.toBeUndefined()
        })
        it('should throw an error if there is a name collision', () => {
            const cmdName = 'awefaff'
            cmd.buildCmd(cmdName, emptyFn)
            expect(()=>cmd.buildCmd(cmdName, emptyFn)).toThrowError()
        })
        it('should throw an error if there is an alias collision single', () => {
            const cmdName = 'awefaff'
            cmd.buildCmd(cmdName, emptyFn)
            expect(()=>cmd.buildCmd('asdf', {alias: cmdName}, emptyFn)).toThrowError()
        })
        it('should throw an error if there is an alias collision multiple', () => {
            const cmdName = 'awefaff'
            cmd.buildCmd(cmdName, emptyFn)
            expect(()=>cmd.buildCmd('asdf', {alias: ['1',cmdName]}, emptyFn)).toThrowError()
        })
    })

    describe('name, opts, and handler', () => {
        it('should add the command to the store', () => {
            const cmdName = 'awekfjawlejfa'
            cmd.buildCmd(cmdName, emptyFn)
            expect(cmd.cmdStore.getState()[cmdName]).not.toBeUndefined()
        })
        it('should add a command for each alias to the store', () => {
            cmd.buildCmd('test', {
                alias: ['a','b']
            }, emptyFn)
            expect(Object.keys(cmd.cmdStore.getState()).length).toEqual(3)
        })
    })

    describe('name, builder, and handler', () => {
        it('should add the command to the store', () => {
            const cmdName = 'awekfjawlejfa'
            cmd.buildCmd(cmdName, {
                alias: ['a','b']
            }, emptyFn, emptyFn)
            expect(cmd.cmdStore.getState()[cmdName]).not.toBeUndefined()
        })
        it('should add all options to the command', () => {
            const cmdName = 'aweljwe'
            cmd.buildCmd(cmdName, args => {
                args.option('op1').option('op2')
            }, emptyFn)
            expect(cmd.cmdStore.getState()[cmdName].cmd.options.length).toEqual(2)
        })
    })

    describe('name, opts, builder, and handler', () => {
        it('should add the command to the store', () => {
            cmd.buildCmd('test', {}, emptyFn, emptyFn)
            expect(cmd.cmdStore.getState()['test']).not.toBeUndefined
        })
        it('should add an item for each alias', () => {
            cmd.buildCmd('test', {
                alias: ['a','b']
            }, emptyFn, emptyFn)
            expect(Object.keys(cmd.cmdStore.getState()).length).toEqual(3)
        })
        it('should add all options to the command', () => {
            const cmdName = 'aweljwe'
            cmd.buildCmd(cmdName,{}, args => {
                args.option('op1').option('op2')
            }, emptyFn)
            expect(cmd.cmdStore.getState()[cmdName].cmd.options.length).toEqual(2)
        })
    })
})

describe('runCmd', () => {
    afterEach(() => {
        cmd.cmdStore.dispatch({type: 'RESET'})
    })

    describe('cmd NOT found', () => {
        it('should call ack with an error msg', () => {
            const mockAck = mock()
            cmd.runCmd('awefawef', mockAck, {} as any)
            expect(mockAck.callCount).toEqual(1)
            expect(typeof mockAck.args[0][0]).toEqual('string')
        })
        it.todo('should NOT try to call a handler')
    })

    describe('options', () => {
        it.todo('should run the typeof check')
        it.todo('should run validator if it exists')
    })

    describe('handler function', () => {
        describe('inputs object', () => {
            const cmdName = 'wewlkfjqwe'
            const alias ='aaa'
            let mockHandler = mock()
            beforeEach(() => {
                mockHandler = mock()
                cmd.buildCmd(cmdName, {alias}, mockHandler)
            })

            describe('$0', () => {
                it('should be the name of the command', () => {
                    cmd.runCmd(cmdName, () => {}, {} as any)
                    expect(mockHandler.args[0][0].$0).toEqual(cmdName)
                })
                it('should be the name of the command if input was an alias', () => {
                    cmd.runCmd(alias, () => {}, {} as any)
                    expect(mockHandler.args[0][0].$0).toEqual(cmdName)
                })
            })
            
            describe('_', () => {
                it('should be an empty list if no extra input', () => {
                    cmd.runCmd(cmdName, () => {}, {} as any)
                    expect(mockHandler.args[0][0]._).toEqual([])
                })
                it('should have inputs that are NOT part of options', () => {
                    cmd.runCmd(`${cmdName} item1 item2`, () => {}, {} as any)
                    expect(mockHandler.args[0][0]._.length).toEqual(2)
                })
            })

            describe('opt keys', () => {

            })
        })
    })
})