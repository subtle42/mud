import { buildCmd } from './index'

buildCmd('say', opts => {
    return opts.option('message', {
        demand: true,
        desc: 'The message you will say to the room'
    }) 
}, (args, ack) => {
    console.log(args)
    // TODO: broadcast to room
    ack(`You say: ${args.message}`)
})

buildCmd('inventory', {
    alias: 'inv',
    desc: 'Look at your inventory'
}, (args, ack) => {
    ack('this is what you have on you...')
})
