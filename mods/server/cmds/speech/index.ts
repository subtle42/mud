import { buildCmd } from ".."


buildCmd('hail', {
    desc: 'Hail a character to start a conversation'
})
.option('character', {
    demand: true
})

buildCmd('say', {
    desc: 'send a message to everyone in the same room'
})
.option('message', {
    demand: true,
    desc: 'The message you will say to the room'
})
.handler((args, socket) => {
    console.log(args)
    // TODO: broadcast to room
    socket.respond(`You say: ${args.message}`)
})

buildCmd('yell', {
    desc: 'send a message to the entire zone'
})
.option('message', {
    demand: true,
    desc: 'the message you will send to everyone in the zone'
})

buildCmd('tell', {
    desc: 'send a private message to a player'
})
.option('message', {
    demand: true,
    desc: 'the message you will send to the player'
})
