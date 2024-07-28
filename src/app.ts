import express from 'express'
import { sequelize as conn } from '../config/sequelize'
import UserRoutes from './routes/UserRoute'
import PostRoutes from './routes/PostRoute'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/users', UserRoutes)
app.use('/posts', PostRoutes)

conn.sync().then(() => app.listen(process.env.PORT || 5000))
