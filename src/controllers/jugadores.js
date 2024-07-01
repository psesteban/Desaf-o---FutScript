import * as sql from '../models/consultas.js'

export const obtenerJugadores = (req, res) => sql.getPlayers(req.params)
  .then((jugadores) => res.status(200).json({ jugadores }))
  .catch((error) => res.status(500).json(error)
  )

export const registrarJugador = (req, res) => sql.addPlayer(req.body, req.params)
  .then((jugador) => res.status(201).json({ message: 'Jugador agregado con éxito', 'nuevo jugador': jugador }))
  .catch((error) => res.status(500).json(error)
  )
