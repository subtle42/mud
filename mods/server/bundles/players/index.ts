import rfdc from 'rfdc'
import { logger } from '../../logger'
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

export const doesPlayerExist = (name: string): boolean => {
    logger.warn('doesPlayerExist is a stub and is NOT implemented')
    return true
}