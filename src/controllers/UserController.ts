import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import User from '../models/User'
import { Op } from 'sequelize'

export default class UserController {
   static async signupUser(req: Request, res: Response) {
      const { email, username, password, confirmPassword } = req.body

      if (!email) {
         return res.status(422).json({ message: 'E-mail is requerid' })
      }

      if (!username) {
         return res.status(422).json({ message: 'User is required' })
      }

      if (!password) {
         return res.status(422).json({ message: 'Password is required' })
      }

      if (!confirmPassword) {
         return res.status(422).json({ message: 'Confirm password is required' })
      }

      if (password !== confirmPassword) {
         return res.status(422).json({ message: 'Passwords must be the same' })
      }

      const userExist = await User.findOne({
         where: { [Op.or]: [{ email }, { username }] },
      })

      if (userExist) {
         return res.status(422).json({ message: 'User existing' })
      }

      const paswordHash = await bcrypt.hash(password, 12)

      try {
         const newUser = await User.create({
            email,
            username,
            password: paswordHash,
         })

         return res.status(201).json({ message: 'New user created whith successfully', newUser })
      } catch (error) {}
   }
}
