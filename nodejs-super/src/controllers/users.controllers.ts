import { Request, Response } from 'express'
import databaseService from '~/services/database.services'
import User from '~/models/schemas/User.schema'
import usersService from '~/services/users.services'

export const loginController = (req: Request, resp: Response) => {
  return resp.status(200).json({
    message: 'Login success'
  })
}

export const registerController = async (req: Request, resp: Response) => {
  const { email, password } = req.body
  try {
    const result = await usersService.register({ email, password })

    return resp.json({
      error: 'Register success',
      result
    })
  } catch (error) {
    console.log(error)
    return resp.status(400).json({
      error: 'Register failed'
    })
  }
}
