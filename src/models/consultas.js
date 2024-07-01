import data from './querys.js'
import jwt from 'jsonwebtoken'
import { secretKey } from '../utils/utils.js'

export const verificarCredenciales = async ({ username, password }) => {
  const administrador = [{
    username: 'admin',
    password: '1234'
  }]
  const { password: correctPassword, username: admin } = administrador[0]
  if (username !== admin || password !== correctPassword) { throw 'Email o contraseña incorrecta' }
  return jwt.sign(username, secretKey)
}

// Obtener todos los equipos
export const getTeams = async () => {
  const consulta = 'SELECT * FROM equipos;'
  try {
    const equipos = await data(consulta)
    return equipos
  } catch (error) {
    console.error('Error al obtener equipos:', error)
    return error
  }
}

export const getPlayers = async ({ teamID }) => {
  const consulta = `
    SELECT jugadores.id, jugadores.name, posiciones.name AS posicion
    FROM jugadores
    INNER JOIN posiciones ON jugadores.position = posiciones.id
    WHERE jugadores.id_equipo = $1;
  `
  const values = [teamID]
  try {
    const jugadores = await data(consulta, values)
    const jugadoresFormateados = jugadores.map(jugador => ({
      name: jugador.name,
      position: jugador.posicion
    }))
    return jugadoresFormateados
  } catch (error) {
    console.error('Error al obtener jugadores:', error)
    return error
  }
}

// Agregar un equipo
export const addTeam = async (equipo) => {
  const { name } = equipo
  const consulta = 'INSERT INTO equipos (id, name) VALUES (DEFAULT, $1) RETURNING *;'
  const values = [name]
  try {
    const nuevoEquipo = await data(consulta, values)
    return nuevoEquipo
  } catch (error) {
    console.error('Error al agregar equipo:', error)
    return error
  }
}

// Agregar un jugador
export const addPlayer = async (jugador, equipo) => {
  const { name, position } = jugador
  const { teamID } = equipo
  const consulta = 'INSERT INTO jugadores (id, id_equipo, name, position) VALUES (DEFAULT, $1, $2, $3) RETURNING *;'
  const values = [teamID, name, position]
  console.log(name)
  try {
    const nuevojuegador = await data(consulta, values)
    return nuevojuegador
  } catch (error) {
    console.error('Error al agregar equipo:', error)
    return error
  }
}
