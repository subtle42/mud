import rfdc from 'rfdc'
import { Room } from '../rooms'
const clone = rfdc()

interface Player {
    currentRoom: string
    currentZone: string
}

const activePlayers: {[key: string]: Player} = {}

export const getOnlinePlayers = () => {
    return clone(activePlayers)
}

export function getPlayerByID(id: string): Player {
    return activePlayers[id]
}