import { buildCmd } from "../cmds";


const getRoomDesc = (room: string): string => {
    return `the room desc`
}

const getExitDesc = (room: string): string => {
    return `You see exits leading`
}

const getRoomPlayers = (): string[] => {
    return []
}



const getRoomMobs = (): string[] => {
    return []
}


buildCmd('look', {
    alias: 'l'
}, (inputs, ack) => {
    console.log('inputs', inputs)
    ack(getRoomDesc(''))
})