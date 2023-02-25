
import * as io from 'socket.io'
import express from 'express'
import * as body from 'body-parser'
import * as http from 'http'
import { buildMsgr, runCmd } from './cmds'
import { logger } from './logger'
import { doesPlayerExist } from './bundles/players'

import './cmds/basic'
import './bundles/rooms'
import './bundles/skills'
import { createToken, decodeToken } from './auth'


const app = express()
const httpServer = http.createServer(app)

app.use(body.json())
app.post('/auth', (req, res) => {
    const {username} = req.body
    if (!doesPlayerExist(username)) {
        return res.status(401).json({msg: `player: ${username} was not found`})
    }
    createToken({ username })
    .then(token => res.json({token}))
    .catch(err => res.status(401).json({msg: err}))
})
app.get('/', (req, res) => res.json('ack'))

export const createWebsocketServer = (appServer: http.Server): io.Server => {
    const server = new io.Server(appServer, {
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

    // Auth section for sockets
    // server.use((socket, next) => {
    //     // Retuns error if no token is given
    //     if (!socket.handshake.auth.token) {
    //         logger.error(`no auth for connection`)
    //         return next(new Error(`no auth for connection`))
    //     }
    //     decodeToken(socket.handshake.auth.token)
    //     .then(data => {
    //         socket.data = data
    //         next()
    //     })
    //     .catch(err => next(new Error(err)))
    // })

    logger.info('made server')
    return server
}

export const App = app

if (process.env.NODE_ENV !== 'testing') {
    createWebsocketServer(httpServer).listen(3000)
}
