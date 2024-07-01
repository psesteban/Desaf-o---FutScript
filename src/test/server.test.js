import request from 'supertest'
import { app } from '../../index.js'
import { describe, expect, test } from 'vitest'

const nuevoJugador = { name: 'Nuevo Jugador fake', position: 1 }
const credencialesCorrectas = { username: 'admin', password: '1234' }
const credencialesIncorrectas = { username: 'usuarioIncorrecto', password: 'contraseñaIncorrecta' }
const tokenValido = 'eyJhbGciOiJIUzI1NiJ9.YWRtaW4.DRlhemrjIQnH1VQwjqUM17jX5tVGJaDfxJn98wJrP-I'

describe('SERVER APP', () => {
  // 1. Test para GET /equipos
  test('GET /equipos debería retornar un status code 200 y un arreglo con al menos un objeto', async () => {
    const response = await request(app).get('/equipos')
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body[0]).toBeInstanceOf(Object)
  })

  // 2. Test para POST /login con credenciales correctas
  test('POST /login con credenciales correctas debería retornar un Object', async () => {
    const response = await request(app).post('/login').send(credencialesCorrectas)
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
  })

  // 3. Test para POST /login con credenciales incorrectas
  test('POST /login con credenciales incorrectas debería retornar un status code 400', async () => {
    const response = await request(app).post('/login').send(credencialesIncorrectas)
    expect(response.statusCode).toBe(400)
  })

  // 4. Test para POST /equipos/:teamID/jugadores con token válido en las cabeceras
  test('POST /equipos/:teamID/jugadores con token válido debería retornar un status code 201', async () => {
    const response = await request(app)
      .post('/equipos/1/jugadores')
      .set('Authorization', `Bearer ${tokenValido}`)
      .send(nuevoJugador)
    expect(response.statusCode).toBe(201)
  })
})
