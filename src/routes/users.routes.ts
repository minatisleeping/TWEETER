import { Router } from 'express'
import {
  followController,
  forgotPasswordController,
  getMeController,
  getProfileController,
  loginController,
  logoutController,
  registerController,
  resendEmailVerifyController,
  resetPasswordController,
  updateMeController,
  verifyEmailController,
  verifyForgotPasswordController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  accessTokenValidator,
  followValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  updateMeValidator,
  verifiedUserValidator,
  verifyEmailTokenValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import { UpdateMeReqBody } from '~/models/requests/User.requests'
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

/**
 * * Description: Get my profile
 * Path: /me
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */
usersRouter.get('/me', accessTokenValidator, wrapReqHandler(getMeController))

/**
 * * Description: Update my profile
 * Path: /me
 * Method: PATCH
 * Header: { Authorization: Bearer <access_token> }
 * Body: UserSchema
 */
usersRouter.patch(
  '/me',
  accessTokenValidator,
  verifiedUserValidator as any,
  updateMeValidator,
  filterMiddleware<UpdateMeReqBody>([
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'username',
    'avatar',
    'cover_photo'
  ]),
  wrapReqHandler(updateMeController)
)

/**
 * * Description: Get user profile
 * Path: /:username
 * Method: GET
 */
usersRouter.get('/:username', wrapReqHandler(getProfileController))

/**
 * * Description: Follow others user
 * Path: /:username
 * Method: POST
  Header: { Authorization: Bearer <access_token> }
 * Body: { user_id: string }
 */
usersRouter.post(
  '/follow',
  accessTokenValidator,
  verifiedUserValidator as any,
  followValidator,
  wrapReqHandler(followController)
)

export default usersRouter
