import { Request, Response, NextFunction } from 'express'
import { validationResult, ContextRunner, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import { StatusCodes } from 'http-status-codes'
import { EntityError, ErrorWithStatus } from '~/models/Errors'
// import { EntityError, ErrorWithStatus } from '~/models/Errors'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req)

    // Nếu mà k có lỗi thì next tiếp tục req
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    const errorObject = errors.mapped()
    const entityError = new EntityError({ errors: {} })

    for (const key in errorObject) {
      const { msg } = errorObject[key]
      // Trả về lỗi do k phải validate
      if (msg instanceof ErrorWithStatus && msg.status !== StatusCodes.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }
      entityError.errors[key] = msg
    }

    next(entityError)
  }
}
