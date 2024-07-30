import express from 'express'
import { sequelize as conn } from '../config/sequelize'
import UserRoutes from './routes/UserRoute'
import PostRoutes from './routes/PostRoute'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors({ origin: 'http://localhost:5050', credentials: true }))
app.use(express.json())

app.use('/users', UserRoutes)
app.use('/posts', PostRoutes)

conn.sync().then(() => app.listen(process.env.PORT || 5000))
