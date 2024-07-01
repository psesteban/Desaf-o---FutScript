import * as sql from '../models/consultas.js'

export const authenticatorAdmin = (req, res) => sql.verificarCredenciales(req.body)
  .then((token) => res.status(200).json({ token }))
  .catch((error) => res.status(400).json(error))
