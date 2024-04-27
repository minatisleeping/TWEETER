import { Request, Response, NextFunction } from 'express'
import { validationResult, ContextRunner, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
// import { StatusCodes } from 'http-status-codes'
// import { EntityError, ErrorWithStatus } from '~/models/Errors'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req)

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({ errors: errors.mapped() })
    // const errorObject = errors.mapped()
    // const entityError = new EntityError({ errors: {} })

    // for (const key in errorObject) {
    //   const { msg } = errorObject[key]
    //   if (msg instanceof ErrorWithStatus && msg.status !== StatusCodes.UNPROCESSABLE_ENTITY) {
    //     return next(msg)
    //   }

    //   entityError.errors[key] = msg
    // }

    // next(entityError)
  }
}
