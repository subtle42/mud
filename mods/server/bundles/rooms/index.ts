import { handleError, ingest } from "..";
import { buildCmd } from "../../cmds";

interface Room {
    name: string
    exits: {direction: string, roomId: string}[]
    desc: string
    items: string[]
    mobs: string[]
    player: string[]
}

interface Player {
    name: string
    room: string
}


ingest('./')
.then(res => {
})

const getPlayerRoom = (name: string) => 'asdf'

const getRoom = (roomId: string): Room => ({} as any)

const movePlayer = (playerId: string, roomId: string): void => {}


buildCmd('north', {
    alias: 'n'
}, (inputs, ack, socket) => {
    const playerName: string = socket.data.playerName
    const roomId = getPlayerRoom(playerName)
    const exit = getRoom(roomId).exits.find(x => x.direction === inputs.$0)
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
