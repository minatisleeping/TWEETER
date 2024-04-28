import { checkSchema } from 'express-validator'
import { USER_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'
import { hashPassword } from '~/utils/crypto'
import { validate } from '~/utils/validation'

export const loginValidator = validate(
  checkSchema({
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
          console.log('🚀 ~ options: ~ user:', user)
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
  })
)

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: { errorMessage: USER_MESSAGES.NAME_IS_REQUIRED },
      isString: { errorMessage: USER_MESSAGES.NAME_MUST_BE_A_STRING },
      isLength: {
        options: { min: 1, max: 100 },
        errorMessage: USER_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100
      },
      trim: true
    },
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
    },
    confirm_password: {
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
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      },
      errorMessage: USER_MESSAGES.DATE_OF_BIRTH_BE_ISO8601
    }
  })
)
