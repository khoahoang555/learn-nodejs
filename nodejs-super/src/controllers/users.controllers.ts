import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.services'
import { RegisterReqBody } from '~/models/requests/User.requests'
import { ObjectId } from 'mongodb'
import User from '~/models/schemas/User.schema'
import { USERS_MESSAGES } from '~/constants/messages'

export const loginController = async (req: Request, resp: Response) => {
  const user = req.user as User
  const userId = user._id as ObjectId
  const result = await usersService.login(userId.toString())
  return resp.json({
    error: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  resp: Response,
  next: NextFunction
) => {
  const result = await usersService.register(req.body)
  return resp.json({
    error: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}
