import { Request, Response } from 'express'
import { RegisterReqBody } from '~/models/requests/User.requests'
import { ParamsDictionary } from 'express-serve-static-core'
import User from '~/models/schemas/User.schema'

import userService from '~/services/users.services'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'minatt2002@gmail.com' && password === '123456') {
    return res.status(200).json({
      message: 'Login success!'
    })
  }
  return res.status(400).json({
    error: 'Email or password is incorrect!'
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    const result = await userService.register(req.body)
    return res.json({
      message: 'User success',
      result
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Register failed!',
      error
    })
  }
}
