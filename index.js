import express from 'express'
import cors from 'cors'
import Router from './src/routes/routes.js'
import { serverLog } from './src/middleware/middleware_log.js'

export const app = express()
app.use(cors())
app.use(express.json())
app.use(serverLog)
app.use('/', Router)

app.listen(3000, console.log('SERVER ON'))
