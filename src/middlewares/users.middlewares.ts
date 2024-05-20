import { ParamSchema, checkSchema } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { JsonWebTokenError } from 'jsonwebtoken'
import { USER_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'
import { hashPassword } from '~/utils/crypto'
import { verifyToken } from '~/utils/jwt'
import { validate } from '~/utils/validation'
import { ObjectId } from 'mongodb'
import { TokenPayload } from '~/models/requests/User.requests'
import { UserVerifyStatus } from '~/constants/enums'
import { capitalize } from '~/utils/capitalize'
import { REGEX_USERNAME } from '~/constants/regex'
import { verifyAccessToken } from '~/utils/common'

const passwordSchema: ParamSchema = {
  notEmpty: { errorMessage: USER_MESSAGES.PASSWORD_IS_REQUIRED },
  isLength: {
    options: { min: 6, max: 50 },
    errorMessage: USER_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
  },
  isStrongPassword: {
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    errorMessage: USER_MESSAGES.PASSWORD_MUST_BE_STRONG
  }
}

const confirmPasswordSchema: ParamSchema = {
  notEmpty: { errorMessage: USER_MESSAGES.CONFIRM_PASSWORD_IS_REQUIRED },
  isLength: {
    options: { min: 6, max: 50 },
    errorMessage: USER_MESSAGES.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
  },
  isStrongPassword: {
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    errorMessage: USER_MESSAGES.CONFIRM_PASSWORD_MUST_BE_STRONG
  },
  custom: {
    options: (value, { req }) => {
      if (value !== req.body.password) throw new Error(USER_MESSAGES.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD)

      return true
    }
  }
}

const forgotPasswordTokenSchema: ParamSchema = {
  trim: true,
  custom: {
    options: async (value: string, { req }) => {
      if (!value)
        throw new ErrorWithStatus({
          message: USER_MESSAGES.FORGOT_PASSWORD_TOKEN_IS_REQUIRED,
          status: StatusCodes.UNAUTHORIZED
        })

      try {
        const decoded_forgot_password_token = await verifyToken({
          token: value,
          secretOrPublicKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string
        })

        const { user_id } = decoded_forgot_password_token
        const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })

        if (user === null) {
          throw new ErrorWithStatus({
            message: USER_MESSAGES.USER_NOT_FOUND,
            status: StatusCodes.UNAUTHORIZED
          })
        }

        if (user.forgot_password_token !== value) {
          throw new ErrorWithStatus({
            message: USER_MESSAGES.FORGOT_PASSWORD_TOKEN_IS_INCORRECT,
            status: StatusCodes.UNAUTHORIZED
          })
        }

        req.decoded_forgot_password_token = decoded_forgot_password_token
      } catch (error) {
        if (error instanceof JsonWebTokenError) {
          throw new ErrorWithStatus({
            message: capitalize((error as JsonWebTokenError).message),
            status: StatusCodes.UNAUTHORIZED
          })
        }
        throw error
      }

      return true
    }
  }
}

const nameSchema: ParamSchema = {
  notEmpty: { errorMessage: USER_MESSAGES.NAME_IS_REQUIRED },
  isString: { errorMessage: USER_MESSAGES.NAME_MUST_BE_A_STRING },
  trim: true,
  isLength: {
    options: { min: 1, max: 100 },
    errorMessage: USER_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100
  }
}

const dateOfBirthSchema: ParamSchema = {
  isISO8601: {
    options: {
      strict: true,
      strictSeparator: true
    }
  },
  errorMessage: USER_MESSAGES.DATE_OF_BIRTH_BE_ISO8601
}

const userIdSchema: ParamSchema = {
  custom: {
    options: async (value: string, { req }) => {
      if (!ObjectId.isValid(value)) {
        throw new ErrorWithStatus({
          message: USER_MESSAGES.INVALID_USER_ID,
          status: StatusCodes.BAD_REQUEST
        })
      }

      const followed_user = await databaseService.users.findOne({ _id: new ObjectId(value) })

      if (followed_user === null) {
        throw new ErrorWithStatus({
          message: USER_MESSAGES.USER_NOT_FOUND,
          status: StatusCodes.NOT_FOUND
        })
      }
    }
  }
}

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: { errorMessage: USER_MESSAGES.EMAIL_IS_REQUIRED },
        isEmail: { errorMessage: USER_MESSAGES.EMAIL_IS_INVALID },
        trim: true,
        custom: {
          options: async (email, { req }) => {
            const user = await databaseService.users.findOne({
              email,
              password: hashPassword(req.body.password)
            })
            if (!user) throw new Error(USER_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT)

            req.user = user
            return true
          }
        }
      },
      password: {
        notEmpty: { errorMessage: USER_MESSAGES.PASSWORD_IS_REQUIRED },
        isLength: {
          options: { min: 6, max: 50 },
          errorMessage: USER_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: USER_MESSAGES.PASSWORD_MUST_BE_STRONG
        }
      }
    },
    ['body']
  )
)

export const registerValidator = validate(
  checkSchema(
    {
      name: nameSchema,
      email: {
        notEmpty: { errorMessage: USER_MESSAGES.EMAIL_IS_REQUIRED },
        isEmail: { errorMessage: USER_MESSAGES.EMAIL_IS_INVALID },
        trim: true,
        custom: {
          options: async (value) => {
            const isExistEmail = await userService.checkEmailExist(value)
            if (isExistEmail) throw new Error(USER_MESSAGES.EMAIL_ALREADY_EXISTED)

            return true
          }
        }
      },
      password: passwordSchema,
      confirm_password: confirmPasswordSchema,
      date_of_birth: dateOfBirthSchema
    },
    ['body']
  )
)

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value: string, { req }) => {
            const access_token = (value || '').split(' ')[1]
            return await verifyAccessToken(access_token, req as Request)
          }
        }
      }
    },
    ['headers']
  )
)

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: USER_MESSAGES.REFRESH_TOKEN_IS_REQUIRED,
                status: StatusCodes.UNAUTHORIZED
              })
            }

            try {
              const [decoded_refresh_token, refresh_token] = await Promise.all([
                verifyToken({ token: value, secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN as string }),
                databaseService.refresh_tokens.findOne({ token: value })
              ])

              if (refresh_token === null) {
                throw new ErrorWithStatus({
                  message: USER_MESSAGES.REFRESH_TOKEN_IS_ALREADY_USED_OR_NOT_EXISTED,
                  status: StatusCodes.UNAUTHORIZED
                })
              }

              ;(req as Request).decoded_refresh_token = decoded_refresh_token
            } catch (error) {
              if (error instanceof JsonWebTokenError)
                throw new ErrorWithStatus({
                  message: capitalize(error.message),
                  status: StatusCodes.UNAUTHORIZED
                })

              throw error
            }

            return true
          }
        }
      }
    },
    ['body']
  )
)

export const verifyEmailTokenValidator = validate(
  checkSchema(
    {
      email_verify_token: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value)
              throw new ErrorWithStatus({
                message: USER_MESSAGES.EMAIL_VERIFY_TOKEN_IS_REQUIRED,
                status: StatusCodes.UNAUTHORIZED
              })
            try {
              const decoded_email_verify_token = await verifyToken({
                token: value,
                secretOrPublicKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string
              })

              ;(req as Request).decoded_email_verify_token = decoded_email_verify_token
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({
                  message: capitalize((error as JsonWebTokenError).message),
                  status: StatusCodes.UNAUTHORIZED
                })
              }
              throw error
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const forgotPasswordValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: { errorMessage: USER_MESSAGES.EMAIL_IS_REQUIRED },
        isEmail: { errorMessage: USER_MESSAGES.EMAIL_IS_INVALID },
        trim: true,
        custom: {
          options: async (email, { req }) => {
            const user = await databaseService.users.findOne({ email })
            console.log('🚀 ~ options: ~ user:', user)

            if (user === null) {
              throw new ErrorWithStatus({
                message: USER_MESSAGES.USER_NOT_FOUND,
                status: StatusCodes.UNAUTHORIZED
              })
            }

            req.user = user
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const verifyForgotPasswordTokenValidator = validate(
  checkSchema({
    forgot_password_token: forgotPasswordTokenSchema
  })
)

export const resetPasswordValidator = validate(
  checkSchema(
    {
      password: passwordSchema,
      confirm_password: confirmPasswordSchema,
      forgot_password_token: forgotPasswordTokenSchema
    },
    ['body']
  )
)

export const verifiedUserValidator = (req: Request, res: Response, next: NextFunction) => {
  const { verify } = req.decoded_authorization as TokenPayload
  if (verify !== UserVerifyStatus.VERIFIED) {
    return next(
      new ErrorWithStatus({
        message: USER_MESSAGES.USER_NOT_VERIFIED,
        status: StatusCodes.FORBIDDEN
      })
    )
  }
  next()
}

export const updateMeValidator = validate(
  checkSchema(
    {
      name: {
        ...nameSchema,
        optional: true,
        notEmpty: undefined
      },
      date_of_birth: {
        ...dateOfBirthSchema,
        optional: true
      },
      bio: {
        optional: true,
        isString: { errorMessage: USER_MESSAGES.BIO_MUST_BE_A_STRING },
        trim: true,
        isLength: {
          options: { min: 1, max: 200 },
          errorMessage: USER_MESSAGES.BIO_LENGTH_MUST_BE_LESS_THAN_200
        }
      },
      location: {
        optional: true,
        isString: { errorMessage: USER_MESSAGES.LOCATION_MUST_BE_A_STRING },
        trim: true,
        isLength: {
          options: { min: 1, max: 200 },
          errorMessage: USER_MESSAGES.LOCATION_LENGTH_MUST_BE_LESS_THAN_200
        }
      },
      website: {
        optional: true,
        isString: { errorMessage: USER_MESSAGES.WEBSITE_MUST_BE_A_STRING },
        trim: true,
        isLength: {
          options: { min: 1, max: 200 },
          errorMessage: USER_MESSAGES.WEBSITE_LENGTH_MUST_BE_LESS_THAN_200
        }
      },
      username: {
        optional: true,
        isString: { errorMessage: USER_MESSAGES.USERNAME_MUST_BE_A_STRING },
        trim: true,
        custom: {
          options: async (username, { req }) => {
            if (!REGEX_USERNAME.test(username)) throw new Error(USER_MESSAGES.USERNAME_IS_INVALID)
            const user = await databaseService.users.findOne({ username })
            if (user) throw Error(USER_MESSAGES.USERNAME_ALREADY_EXISTED)

            return true
          }
        }
      },
      avatar: {
        optional: true,
        isString: { errorMessage: USER_MESSAGES.IMAGE_URL_MUST_BE_A_STRING },
        trim: true,
        isLength: {
          options: { min: 1, max: 400 },
          errorMessage: USER_MESSAGES.IMAGE_URL_LENGTH_MUST_BE_FROM_1_TO_400
        }
      },
      cover_photo: {
        optional: true,
        isString: { errorMessage: USER_MESSAGES.COVER_PHOTO_MUST_BE_A_STRING },
        trim: true,
        isLength: {
          options: { min: 1, max: 400 },
          errorMessage: USER_MESSAGES.COVER_PHOTO_LENGTH_MUST_BE_LESS_THAN_400
        }
      }
    },
    ['body']
  )
)

export const followValidator = validate(checkSchema({ followed_user_id: userIdSchema }, ['body']))

export const unfollowValidator = validate(checkSchema({ user_id: userIdSchema }, ['params']))

export const changePasswordValidator = validate(
  checkSchema(
    {
      old_password: {
        ...passwordSchema,
        custom: {
          options: async (value, { req }) => {
            const { user_id } = req.decoded_authorization as TokenPayload
            const user = await databaseService.users.findOne({
              _id: new ObjectId(user_id)
            })

            if (user === null) {
              throw new ErrorWithStatus({
                message: USER_MESSAGES.USER_NOT_FOUND,
                status: StatusCodes.NOT_FOUND // 404
              })
            }

            const { password } = user
            if (password !== hashPassword(value)) {
              throw new ErrorWithStatus({
                message: USER_MESSAGES.OLD_PASSWORD_NOT_MATCH,
                status: StatusCodes.UNAUTHORIZED
              })
            }
            return true
          }
        }
      },
      password: passwordSchema,
      confirm_password: confirmPasswordSchema
    },
    ['body']
  )
)
