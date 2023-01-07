import { handleError, ingest } from "..";
import { buildCmd } from "../../cmds";

type Direction = {
    north?: string
    south?: string
}
export interface Room {
    name: string
    exits: {[Property in keyof Direction]: string}
    desc: string
    // items: string[]
    // mobs: string[]
    // player: string[]
}

interface Player {
    name: string
    room: string
}

const getPlayerRoom = (name: string) => 'testroom'

const myRooms: {[key:string]: Room} = {
    testroom :{
    name: 'testroom',
    exits: { north: 'northRoom' },
    desc: 'the first room',
}, northRoom:{
    name: 'northRoom',
    exits: { south: 'testroom'} ,
    desc: 'the second room',
}}

export function getRoom (roomId: string): Room {
    return myRooms[roomId]
}

const movePlayer = (playerId: string, roomId: string): void => {}

const getRoomDescription = (roomdId: string): string[] => {
    const room = myRooms[roomdId]
    return [
        room.name,
        room.desc,
        Object.keys(room.exits).join(', ')
    ]
}

buildCmd('glance', {
    desc: 'Look at an adjacent room',
}, args => {
    args.option('direction', {
        demand: true
    })
}, (inputs, ack, socket) => {
    const {direction} = inputs
    const player = socket.data.player
    const playerRoom = getPlayerRoom(player)
    const connection = getRoom(playerRoom).exits[direction as any]

    if (!connection) {
        socket.emit('msg', getRoomDescription(playerRoom))
        // ack(getRoomDescription(playerRoom))

        return handleError(`No exit towards the ${inputs.direction}.`, ack)
    }
    ack(getRoom(connection.roomId).desc)
})


buildCmd('north', {
    alias: 'n'
}, (inputs, ack, socket) => {
    const playerName: string = socket.data.playerName
    const roomId = getPlayerRoom(playerName)
    const exit = getRoom(roomId).exits[inputs.$0] //.find(x => x.direction === inputs.$0)
    if (!exit) return handleError(`There is no exit in direction: ${inputs.$0}`, ack)
    movePlayer(playerName, exit.roomId)
    ack(getRoom(exit.roomId).desc)
})

buildCmd('south', {
    alias: 's'
}, () => {
})

buildCmd('east', {
    alias: 'e'
}, () => {})

buildCmd('west', {
    alias: 'w'
}, () => {})

buildCmd('in', () => {})
buildCmd('out', () => {})
buildCmd('up', () => {})
buildCmd('down', () => {})
