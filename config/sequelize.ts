import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const { DB_HOST, DB_USER, DB_PASS, DB_NAME }: any = process.env

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
   host: DB_HOST,
   dialect: 'mysql',
})
