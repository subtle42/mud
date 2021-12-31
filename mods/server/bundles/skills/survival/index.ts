import { buildCmd } from "../../../cmds";


buildCmd('consider', {
    alias: 'con'
}, args => {

}, (inputs, ack) => {
    ack('consider')
})