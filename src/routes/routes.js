import { Router } from 'express'
import { obtenerJugadores, registrarJugador } from '../controllers/jugadores.js'
import { obtenerEquipos, agregarEquipo } from '../controllers/equipos.js'
import { authenticatorAdmin } from '../controllers/authenticator.js'
import { authMiddleware } from '../middleware/middleware_verify.js'

const router = Router()

router.route('/equipos').get(obtenerEquipos).post(authMiddleware, agregarEquipo)
router.route('/equipos/:teamID/jugadores').get(obtenerJugadores).post(authMiddleware, registrarJugador)
router.route('/login').post(authenticatorAdmin)

export default router
