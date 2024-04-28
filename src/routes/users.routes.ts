import { Router } from 'express'
import { loginController, logoutController, registerController } from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapReqHandler } from '~/utils/handler'

const usersRouter = Router()

usersRouter.get('/', (req, res) => {
  res.json({
    message: 'Hello, users!'
  })
})

/**
 * Description: Login
 * Path: /login
 * Method: POST
 * Request: { email: string, password: string }
 */
usersRouter.post('/login', loginValidator, wrapReqHandler(loginController))

/**
 * Description: Register a new user
 * Path: /register
 * Method: POST
 * Request: { name: string, email: string, password: string, confirm_password: string, date_of_birth: string }
 */
usersRouter.post('/register', registerValidator, wrapReqHandler(registerController))

/**
 * Description: Logout
 * Path: /logout
 * Method: POST
 * Header: { Authorization: Bea rer <access_token> }
 * Request: { refresh: string }
 */
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapReqHandler(logoutController))

export default usersRouter
