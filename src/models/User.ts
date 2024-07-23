import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/sequelize'

const User = sequelize.define('User', {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
   },

   email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
   },

   username: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true,
   },

   password: {
      type: DataTypes.STRING,
      allowNull: false,
   },

   is_verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
   },
})

export default User
