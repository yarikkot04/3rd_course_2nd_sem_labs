import { Router } from 'express'
import Controller from './сontroller/Controller.js'

const router = Router()
router.get('/', Controller.getLocation)
router.get('/:city', Controller.getCityPage)

export default router
