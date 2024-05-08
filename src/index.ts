import 'dotenv/config'
import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import argv from 'minimist'

const options = argv(process.argv.slice(2))

const app = express()
const PORT = process.env.PORT
databaseService.connect()
app.use(express.json())

console.log(options)
// Tạo folder
initFolder()

app.use('/users', usersRouter)
app.use('/medias', mediasRouter)

app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`DUTHANHDUOC - Nodejs is running at ${process.env.LOCALHOST}:${PORT}`)
})
