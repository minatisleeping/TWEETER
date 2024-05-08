import 'dotenv/config'
import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { UPLOAD_DIR } from './constants/dir'

const app = express()
const PORT = process.env.PORT
databaseService.connect()
app.use(express.json())
console.log('🚀 ~ UPLOAD_DIR:', UPLOAD_DIR)

// Tạo folder
initFolder()

app.use('/users', usersRouter)
app.use('/medias', mediasRouter)

app.use('/static', express.static(UPLOAD_DIR))

app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`DUTHANHDUOC - Nodejs is running at ${process.env.LOCALHOST}:${PORT}`)
})
