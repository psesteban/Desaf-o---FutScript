import * as sql from '../models/consultas.js'

export const obtenerEquipos = (req, res) => sql.getTeams(req.body)
  .then((equipos) => res.status(200).json(equipos))
  .catch((error) => res.status(500).json(error)
  )

export const agregarEquipo = (req, res) => sql.addTeam(req.body)
  .then(res.status(200).json({ message: 'Equipo agregado con éxito' }))
  .catch((error) => res.status(500).json(error)
  )
