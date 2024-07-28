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

   userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
         model: User,
         key: 'id',
      },
   },
})

User.hasMany(Post, { as: 'posts', foreignKey: 'userId' })
Post.belongsTo(User, { as: 'user', foreignKey: 'userId' })
