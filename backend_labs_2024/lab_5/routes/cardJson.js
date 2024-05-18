import { Router } from 'express'
import Controller from './controller/Controller.js'

const router = Router()

router.get('/', Controller.getAllInfoJSON)
router.get('/:id', Controller.getCardInfoJSON)

export default router
