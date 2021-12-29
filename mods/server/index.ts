
import * as io from 'socket.io'
import { runCmd } from './cmds'

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
        client.send('connection successful.')
        client.on('cmd', (usrInput: string, ack: (res:string|string[])=>void) => {
            if (!ack) return client.emit('err', `Need ack function`)
            try {
                runCmd(usrInput, ack, client)
            } catch(e) {
                console.error(e)
            }
        })
    })
    console.log('made server')
    return server
}

// import './bundles/rooms'
import './bundles/skills'

createServer().listen(3000)