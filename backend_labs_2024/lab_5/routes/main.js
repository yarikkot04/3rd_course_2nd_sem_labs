import { Router } from 'express'
import Controller from './controller/Controller.js'

const router = Router()

router.get('/', Controller.getMainPage)

export default router
