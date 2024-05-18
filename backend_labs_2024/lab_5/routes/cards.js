import { Router } from 'express'
import Controller from './controller/Controller.js'

const router = Router()

router.get('/', Controller.getCardsPage)
router.get('/:id', Controller.getCardById)

export default router
