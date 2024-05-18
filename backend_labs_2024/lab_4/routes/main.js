import { Router } from 'express'
import Controller from './сontroller/Controller.js'

const router = Router()

router.get('/', Controller.getMainPage)

export default router
