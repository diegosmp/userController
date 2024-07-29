import { Request, Response } from 'express'
import { Post } from '../models/Post'
import { User } from '../models/User'
import { where } from 'sequelize'

export default class PostController {
   static async createPost(req: Request, res: Response) {
      const { title, img_post, post, description } = req.body

      if (!title) {
         return res.status(422).json({ message: 'The field title is required!' })
      }

      if (!post) {
         return res.status(422).json({ message: 'The field post is required!' })
      }

      if (!description) {
         return res.status(422).json({ message: 'The field description is required!' })
      }

      try {
         const newPost = await Post.create({
            title,
            post,
            img_post,
            description,
            userId: req.user.id,
         })

         return res.status(201).json({ message: 'Post created successfully!', newPost })
      } catch (error) {
         console.error(error)
         return res.status(500).json({ message: 'Error connect server!' })
      }
   }

   static async showAllPost(req: Request, res: Response) {
      const posts = await Post.findAll()
      return res.status(200).json({ posts })
   }

   static async editPost(req: Request, res: Response) {
      const { title, imgPost, post, description } = req.body
      const { postId } = req.params
      const postExist: any = await Post.findByPk(postId)

      const userAuth = postExist.userId

      if (userAuth !== req.user.id) {
         return res.status(422).json({ message: 'User unauthorized!' })
      }

      if (!postExist) {
         return res.status(404).json({ message: 'Post not exist!' })
      }

      if (!title) {
         return res.status(422).json({ message: 'The field title is required!' })
      }

      if (!post) {
         return res.status(422).json({ message: 'The field post is required!' })
      }

      if (!description) {
         return res.status(422).json({ message: 'The field description is required!' })
      }

      try {
         await Post.update(
            {
               title,
               imgPost,
               post,
               description,
            },
            { where: { id: postId } },
         )

         return res.status(201).json({ message: 'Updated post successfully!' })
      } catch (error) {
         console.error(error)
         return res.status(500).json({ message: 'Error connect server!' })
      }
   }
}
