import {buildCmd, runCmd, cmdStore} from '.'


describe('buildCmd', () => {
    afterEach(() => {
        cmdStore.dispatch({type: 'RESET'})
    })

    describe('name and handler', () => {
        it('should add the command to the store', () => {
            const cmdName = 'awekfjawlejfa'
            buildCmd(cmdName)
            expect(cmdStore.getState()[cmdName]).not.toBeUndefined()
        })
        it('should throw an error if there is a name collision', () => {
            const cmdName = 'awefaff'
            buildCmd(cmdName)
            expect(()=>buildCmd(cmdName)).toThrowError()
        })
        it('should throw an error if there is an alias collision single', () => {
            const cmdName = 'awefaff'
            buildCmd(cmdName)
            expect(()=>buildCmd('asdf', {alias: cmdName})).toThrowError()
        })
        it('should throw an error if there is an alias collision multiple', () => {
            const cmdName = 'awefaff'
            buildCmd(cmdName)
            expect(()=>buildCmd('asdf', {alias: ['1',cmdName]})).toThrowError()
        })
    })

    describe('name, opts, and handler', () => {
        it('should add the command to the store', () => {
            const cmdName = 'awekfjawlejfa'
            buildCmd(cmdName)
            expect(cmdStore.getState()[cmdName]).not.toBeUndefined()
        })
        it('should add a command for each alias to the store', () => {
            buildCmd('test', {
                alias: ['a','b']
            })
            expect(Object.keys(cmdStore.getState()).length).toEqual(3)
        })
    })

    describe('name, builder, and handler', () => {
        it('should add the command to the store', () => {
            const cmdName = 'awekfjawlejfa'
            buildCmd(cmdName, {
                alias: ['a','b']
            })
            expect(cmdStore.getState()[cmdName]).not.toBeUndefined()
        })
        it('should add all options to the command', () => {
            const cmdName = 'aweljwe'
            buildCmd(cmdName).option('op1').option('op2')
            expect(cmdStore.getState()[cmdName].options.length).toEqual(2)
        })
    })

    describe('name, opts, builder, and handler', () => {
        it('should add the command to the store', () => {
            buildCmd('test', {})
            expect(cmdStore.getState()['test']).not.toBeUndefined
        })
        it('should add an item for each alias', () => {
            buildCmd('test', {
                alias: ['a','b']
            })
            expect(Object.keys(cmdStore.getState()).length).toEqual(3)
        })
        it('should add all options to the command', () => {
            const cmdName = 'aweljwe'
            buildCmd(cmdName).option('op1').option('op2')
            expect(cmdStore.getState()[cmdName].options.length).toEqual(2)
        })
    })
})

describe('runCmd', () => {
    afterEach(() => {
        cmdStore.dispatch({type: 'RESET'})
    })

    describe('cmd NOT found', () => {
        it('should call ack with an error msg', () => {
            const mockAck = jest.fn()
            runCmd('awefawef', { error: mockAck} as any)
            expect(mockAck).toHaveBeenCalledTimes(1)
            expect(typeof mockAck.mock.calls[0][0]).toEqual('string')
        })
    })

    describe('options', () => {
        describe('demand', () => {
            const taskName = 'awelkawef'
            let mockHandler: jest.Mock
            beforeEach(() => {
                mockHandler = jest.fn()
                buildCmd(taskName)
                .option('opt', {demand:true})
                .handler(mockHandler)
            })
            it('should NOT call handler if option is NOT given', () => {
                runCmd(taskName, {error: jest.fn()} as any)
                expect(mockHandler).not.toHaveBeenCalled()
            })
            it('should call the handler if all options are given', () => {
                runCmd(`${taskName} lkawef lawj`, {emit: jest.fn()} as any)
                expect(mockHandler).toHaveBeenCalled()
            })
        })

        describe('validator fn', () => {
            it('should run validator if it exists', () => {
                const validStub = jest.fn(() => true)
                const cmdName = 'test'
    
                buildCmd(cmdName).option('opt', {
                    validateFn: validStub
                })
                runCmd(`${cmdName} awefg`, {error: jest.fn()} as  any)
                expect(validStub).toHaveBeenCalledTimes(1)
            })

            describe('if validator returns false', () => {
                let validStub: jest.Mock
                let handlerStub: jest.Mock
                const cmdName= 'notvalidoption'
                beforeEach(() => {
                    validStub = jest.fn(() => false)
                    handlerStub = jest.fn()
                    buildCmd(cmdName)
                    .option('asd', {
                        validateFn: validStub
                    })
                    .handler(handlerStub)
                })
                it('should call ack with error', () => {
                    const ackMock = jest.fn()
                    runCmd(`${cmdName} another`, {error: ackMock} as any)
                    expect(ackMock).toHaveBeenCalled()
                })
                it('should NOT call the handler', () => {
                    runCmd(`${cmdName} asdf asf`, {error: jest.fn()} as any)
                    expect(handlerStub).not.toHaveBeenCalled()
                })
            })
            describe('if the validator return true', () => {
                it('should call the handler', () => {
                    const cmdName = 'awefawef'
                    const myStub = jest.fn()
                    buildCmd(cmdName)
                    .option('aweff', {
                        validateFn: () => true
                    })
                    .handler(myStub)
                    
                    runCmd(`${cmdName} awf awef`, {} as any)
                    expect(myStub).toHaveBeenCalled()
                })
            })
        })

        describe('type', () => {
            it.todo('should call handler on success')
            it.todo('should call ack on failuer')
        })
    })

    describe('handler function', () => {
        describe('inputs object', () => {
            const cmdName = 'wewlkfjqwe'
            const alias ='aaa'
            let mockHandler: jest.Mock
            beforeEach(() => {
                mockHandler = jest.fn()
                buildCmd(cmdName, {alias}).handler(mockHandler)
            })

            describe('$0', () => {
                it('should be the name of the command', () => {
                    runCmd(cmdName, {emit: jest.fn()} as any)
                    expect(mockHandler).toHaveBeenCalled()
                    expect(mockHandler.mock.calls[0][0].$0).toEqual(cmdName)
                })
                it('should be the name of the command if input was an alias', () => {
                    runCmd(alias, {emit: jest.fn()} as any)
                    expect(mockHandler.mock.calls[0][0].$0).toEqual(cmdName)
                })
            })
            
            describe('_', () => {
                it('should be an empty list if no extra input', () => {
                    runCmd(cmdName, {emit: jest.fn()} as any)
                    expect(mockHandler.mock.calls[0][0]._).toEqual([])
                })
                it('should have inputs that are NOT part of options', () => {
                    runCmd(`${cmdName} item1 item2`, {emit: jest.fn()} as any)
                    expect(mockHandler.mock.calls[0][0]._.length).toEqual(2)
                })
            })
        })
    })
})