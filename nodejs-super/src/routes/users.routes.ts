import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { registerValidator } from '~/middlewares/users.middlewares'

const usersRoutes: Router = Router()

usersRoutes.post('/login', loginController)
usersRoutes.post('/register', registerValidator, registerController)

export default usersRoutes
