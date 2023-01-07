
import * as io from 'socket.io'
import { buildMsgr, runCmd } from './cmds'
import { logger } from './logger'

import './cmds/basic'
import './bundles/rooms'
import './bundles/skills'


export const createServer = (): io.Server => {
    const server = new io.Server({
        allowRequest: (req, callback) => {
            callback(null, true);
        },
        cors: {
            origin: "http://localhost:9000",
            methods: ["GET", "POST"]
        }
    })
    server.on('connection', client => {
        client.data = {
            player: 'daniel'
        }
        client.send('connection successful.')
        const messenger = buildMsgr(client)
        client.on('cmd', (usrInput: string) => {
            logger.info(`cmd: ${usrInput}`)
            try {
                runCmd(usrInput, messenger)
            } catch(e) {
                logger.error(e)
                client.emit(`Error: ${JSON.stringify(e)}`)
            }
        })
    })
    logger.info('made server')
    return server
}

createServer().listen(3000)
