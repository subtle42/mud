import * as http from 'http'
import * as body from 'body-parser'
import cors from 'cors'
import express from 'express'
import { zoneRouter } from './api/zone'

const server = express()

server.use(body.json())
server.use(cors())

server.use('/zone', zoneRouter)

server.listen(3000, () => {
    console.log('listening')
})