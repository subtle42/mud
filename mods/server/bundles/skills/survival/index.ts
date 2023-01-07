import { buildCmd } from "../../../cmds";


buildCmd('consider', {
    alias: 'con'
})
.handler((inputs, socket) => {
    socket.respond('msg', 'consider')
})