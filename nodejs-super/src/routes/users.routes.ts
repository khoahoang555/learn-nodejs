import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRoutes: Router = Router()

usersRoutes.post('/login', loginController)
usersRoutes.post('/register', registerValidator, wrapRequestHandler(registerController))

export default usersRoutes
