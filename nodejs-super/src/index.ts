import express, { ErrorRequestHandler, Express } from 'express'
import usersRoutes from '~/routes/users.routes'
import databaseService from '~/services/database.services'

const app: Express = express()
const port: number = 3000

app.use(express.json())
app.use('/users', usersRoutes)
databaseService.connect()
// app.use((err, req, resp, next) => {
//   console.log('Error is ', err.message)
//   resp.status(400).json({ error: err.message })
// })

const errorHandler: ErrorRequestHandler = (err, req, resp, next) => {
  console.log('Error is ', err.message)
  resp.status(400).json({ error: err.message })
}
app.use(errorHandler)

app.listen(port, () => {
  console.log(`App running on port: ${port}`)
})
