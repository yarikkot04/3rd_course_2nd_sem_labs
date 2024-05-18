import { Router } from 'express'
import Controller from './controller/Controller.js'

const router = Router()

router.get('/:id', Controller.getDeleteCardPage)
router.delete('/:id', Controller.deleteCard)

export default router
