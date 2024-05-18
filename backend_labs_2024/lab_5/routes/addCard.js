import { Router } from 'express'
import Controller from './controller/Controller.js'

const router = Router()

router.get('/', Controller.getAddCardPage)
router.post('/', Controller.createNewCard)

export default router
