import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'

const app = express()
const PORT = process.env.PORT || 3000
databaseService.connect()

app.use(express.json())

app.use('/users', usersRouter)

app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`DUTHANHDUOC - Nodejs is running at http://localhost:${PORT}`)
})
