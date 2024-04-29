import { Router } from 'express'
import {
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
  resendEmailVerifyController,
  resetPasswordController,
  verifyEmailController,
  verifyForgotPasswordController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  verifyEmailTokenValidator,
  verifyForgotPasswordTokenValidator
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

/**
 * * Description: Resend verify email when user client click on the link in email
 * Path: /forgot-password
 * Method: POST
 * Request: { email: string }
 */
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapReqHandler(forgotPasswordController))

/**
 * * Description: Verify forgot password when user client click on the link in email
 * Path: /verify-forgot-password
 * Method: POST
 * Request: { forgot_password_token: string }
 */
usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapReqHandler(verifyForgotPasswordController)
)

/**
 * * Description: Reset password
 * Path: /reset-password
 * Method: POST
 * Request: { forgot_password_token: string, password: string, confirm_password: string }
 */
usersRouter.post('/reset-password', resetPasswordValidator, wrapReqHandler(resetPasswordController))

export default usersRouter
