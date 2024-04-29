import { Router } from 'express'
import {
  loginController,
  logoutController,
  registerController,
  resendEmailVerifyController,
  verifyEmailController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  verifyEmailTokenValidator
} from '~/middlewares/users.middlewares'
import { wrapReqHandler } from '~/utils/handler'

const usersRouter = Router()

usersRouter.get('/', (req, res) => {
  res.json({
    message: 'Hello, users!'
  })
})

/**
 * * Description: Login
 * Path: /login
 * Method: POST
 * Request: { email: string, password: string }
 */
usersRouter.post('/login', loginValidator, wrapReqHandler(loginController))

/**
 * * Description: Register a new user
 * Path: /register
 * Method: POST
 * Request: { name: string, email: string, password: string, confirm_password: string, date_of_birth: string }
 */
usersRouter.post('/register', registerValidator, wrapReqHandler(registerController))

/**
 * * Description: Logout
 * Path: /logout
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Request: { refresh: string }
 */
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapReqHandler(logoutController))

/**
 * * Description: Verify email when user client click on the link in email
 * Path: /verify-email
 * Method: POST
 * Request: { email_verify_token: string }
 */
usersRouter.post('/verify-email', verifyEmailTokenValidator, wrapReqHandler(verifyEmailController))

/**
 * * Description: Resend verify email when user client click on the link in email
 * Path: /resend-verify-email
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Request: { email_verify_token: string }
 */
usersRouter.post('/resend-verify-email', accessTokenValidator, wrapReqHandler(resendEmailVerifyController))

export default usersRouter
