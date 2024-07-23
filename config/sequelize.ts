import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('usersController', 'root', '', {
   host: 'localhost',
   dialect: 'mysql',
})
