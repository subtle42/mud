
import * as io from 'socket.io'
import * as cmds from './cmds'

export const createServer = (cmds: any): io.Server => {
    const cmdKeys = Object.keys(cmds)
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
        client.on('cmd', (usrInput: string, ack: (res:string)=>void) => {
            console.log(usrInput)
            if (!ack) return client.emit('err', `Need ack function`)
            const usrInputArr = usrInput.split(' ')
            const usrCmd = usrInputArr.shift() || ''
            if (!cmdKeys.includes(usrCmd)) {
                console.log('no cmd', usrInput)
                return ack(`could not find command: ${usrCmd}`)
            }
            try {
                cmds[usrCmd](usrInputArr, ack)
            } catch(e) {
                console.error(e)
            }
        })
    })
    console.log('made server')
    return server
}

createServer(cmds).listen(3000)