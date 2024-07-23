import express from 'express'
import { sequelize as conn } from '../config/sequelize'
import UserRoutes from './routes/UserRoute'

const app = express()

app.use(express.json())

app.use('/users', UserRoutes)

conn.sync().then(() => app.listen(3333 || 5000))
