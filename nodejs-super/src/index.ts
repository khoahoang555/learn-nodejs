import express, { Express } from 'express'
import usersRoutes from '~/routes/users.routes'
import databaseService from '~/services/database.services'

const app: Express = express()
const port: number = 3000

app.use(express.json())
app.use('/users', usersRoutes)
databaseService.connect()

app.listen(port, () => {
  console.log(`App running on port: ${port}`)
})
