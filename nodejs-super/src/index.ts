import express, { ErrorRequestHandler, Express, NextFunction, Request, Response } from 'express'
import usersRoutes from '~/routes/users.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from '~/middlewares/error.middlewares'

databaseService.connect()

const app: Express = express()
const port: number = 3000

app.use(express.json())
app.use('/users', usersRoutes)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`App running on port: ${port}`)
})
