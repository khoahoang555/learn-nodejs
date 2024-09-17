import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRoutes: Router = Router()

usersRoutes.post('/login', loginValidator, wrapRequestHandler(loginController))
usersRoutes.post('/register', registerValidator, wrapRequestHandler(registerController))
usersRoutes.post('/logout', accessTokenValidator, refreshTokenValidator, (req, resp) => {
  resp.status(200).json({ message: 'success' })
})

export default usersRoutes
