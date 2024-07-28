import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/sequelize'

export const User = sequelize.define('User', {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
   },

   firstname: {
      type: DataTypes.STRING,
      allowNull: false,
   },

   lastname: {
      type: DataTypes.STRING,
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

   img_profile: {
      type: DataTypes.STRING,
   },

   is_verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
   },
})
