import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/users', usersRouter)

databaseService.connect()

app.listen(PORT, () => {
  console.log(`DUTHANHDUOC - Nodejs is running at http://localhost:${PORT}`)
})
