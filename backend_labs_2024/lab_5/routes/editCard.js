import { Router } from 'express'
import Controller from './controller/Controller.js'

const router = Router()

router.get('/:id', Controller.getEditCardPage)
router.put('/:id', Controller.editCard)

export default router
