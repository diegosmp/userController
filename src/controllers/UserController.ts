import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import User from '../models/User'
import { Op } from 'sequelize'
import path from 'path'
import { validatorEmail } from '../helpers/validateEmail'

const userImgNoProfile = path.join(__dirname, '../public/img/userImgNoProfile.png')

export default class UserController {
   static async signupUser(req: Request, res: Response) {
      const { firstname, lastname, email, username, password, confirmPassword, img_profile } = req.body

      if (!firstname) {
         return res.status(422).json({ message: 'Firstname is requerid!' })
      }

      if (!lastname) {
         return res.status(422).json({ message: 'Lastname is requerid!' })
      }

      if (!email) {
         return res.status(422).json({ message: 'E-mail is requerid!' })
      }

      if (!username) {
         return res.status(422).json({ message: 'User is required!' })
      }

      if (!password) {
         return res.status(422).json({ message: 'Password is required!' })
      }

      if (!confirmPassword) {
         return res.status(422).json({ message: 'Confirm password is required!' })
      }

      if (password !== confirmPassword) {
         return res.status(422).json({ message: 'Passwords must be the same!' })
      }

      try {
         validatorEmail(email)
      } catch (error) {
         return res.status(422).json({ message: 'E-mail invalidaded!' })
      }
      const userExist = await User.findOne({
         where: { [Op.or]: [{ email }, { username }] },
      })

      if (userExist) {
         return res.status(422).json({ message: 'User existing!' })
      }

      const paswordHash = await bcrypt.hash(password, 12)

      try {
         const newUser = await User.create({
            firstname,
            lastname,
            email,
            username,
            password: paswordHash,
            img_profile: img_profile || userImgNoProfile,
         })

         return res.status(201).json({ message: 'New user created whith successfully', newUser })
      } catch (error) {
         console.error(error)
         return res.status(500).json({ message: 'Error connect server!' })
      }
   }
}
