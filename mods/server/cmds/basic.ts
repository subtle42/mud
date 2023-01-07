import { buildCmd, getCmd } from './index'



buildCmd('inventory', {
    alias: 'inv',
    desc: 'Look at your inventory'
})
.handler((args, socket) => {
    socket.respond('this is what you have on you...')
})



buildCmd('help', {
    desc: 'A command to help describe outher commands',
})
.option('command', {
    demand: true,
    desc: 'the command to inspect',
    helpText: 'Need command that exists',
    validateFn: cmdName => {
        return !!getCmd(cmdName)
    }
})
.handler((inputs, socket) => {
    const cmd = getCmd(inputs.command as string)
    socket.respond(`
        ${cmd} ${cmd.options.map(o => `[${o.name}]`)}\n
        ${cmd.options.map(o => `--[${o.name}] ${o.desc}`).join(`\n`)}
    `)
})

const zoneList: string[] = []
buildCmd('who', {
    desc: 'search for players',
})
.option('zone', {
    desc: 'the zone to search for players',
    validateFn: (input) => {
        if (!input) return true
        return zoneList.includes(input)
    },
    helpText: 'can be left blank to search your current zone or must be valid zone name'
})


const subjectList: string[] = []
buildCmd('list', {
    desc: 'list different things in game'
})
.option('subject', {
    demand: true,
    validateFn: input => subjectList.includes(input),
    helpText: `Listable subjects are ${subjectList.map(item => item).join(', ')}`
})