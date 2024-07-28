import { sequelize } from '../../config/sequelize'
import { DataTypes } from 'sequelize'
import { User } from './User'

export const Post = sequelize.define('Post', {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
   },

   title: {
      type: DataTypes.STRING(50),
      allowNull: false,
   },

   img_post: {
      type: DataTypes.STRING,
   },

   post: {
      type: DataTypes.TEXT,
      allowNull: false,
   },

   description: {
      type: DataTypes.STRING,
      allowNull: false,
   },

   id_user: {
      type: DataTypes.UUID,
      allowNull: false,
   },
})

User.hasMany(Post)
Post.belongsTo(User)
