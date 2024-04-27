import express, { Request, Response, NextFunction } from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { StatusCodes } from 'http-status-codes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/users', usersRouter)

databaseService.connect()

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Lỗi òi', err.message)
  res.status(StatusCodes.BAD_REQUEST).json({ message: err.message })
})

app.listen(PORT, () => {
  console.log(`DUTHANHDUOC - Nodejs is running at http://localhost:${PORT}`)
})
