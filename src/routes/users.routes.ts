import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controller'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapReqHandler } from '~/utils/handler'

const usersRouter = Router()

usersRouter.get('/', (req, res) => {
  res.json({
    message: 'Hello, users!'
  })
})

usersRouter.post('/login', loginValidator, loginController)

/**
 * Description: Register a new user
 * Path: /register
 * Method: POST
 * Request: { name: string, email: string, password: string }
 */
usersRouter.post('/register', registerValidator, wrapReqHandler(registerController))

export default usersRouter
