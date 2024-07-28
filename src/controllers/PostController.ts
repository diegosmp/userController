import { Request, Response } from 'express'
import { Post } from '../models/Post'

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
         })

         return res.status(201).json({ message: 'Post created successfully!', newPost })
      } catch (error) {
         console.error(error)
         return res.status(500).json({ message: 'Error connect server!' })
      }
   }
}
