import 'dotenv/config'
import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'

const app = express()
const PORT = process.env.PORT
databaseService.connect()

app.use(express.json())

app.use('/users', usersRouter)

app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`DUTHANHDUOC - Nodejs is running at ${process.env.DB_HOST}:${PORT}`)
})
