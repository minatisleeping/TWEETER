import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { omit } from 'lodash'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(omit(err, ['status']))
}
