import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import databaseService from '~/services/database.services'
import User from '~/models/schemas/User.schema'
import usersService from '~/services/users.services'
import { RegisterReqBody } from '~/models/requests/User.requests'

export const loginController = (req: Request, resp: Response) => {
  return resp.status(200).json({
    message: 'Login success'
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  resp: Response,
  next: NextFunction
) => {
  const result = await usersService.register(req.body)
  return resp.json({
    error: 'Register success',
    result
  })
}
