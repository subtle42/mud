import { Router } from "express"
import * as ctrl from './controller'

export const zoneRouter = Router()

zoneRouter.get('/all', ctrl.getAll)
zoneRouter.get('/:id', ctrl.getOne)
zoneRouter.post('/', ctrl.create)
zoneRouter.put('/', ctrl.update)
zoneRouter.delete('/:id', ctrl.remove)
