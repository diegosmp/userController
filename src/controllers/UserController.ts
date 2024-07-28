import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import User from '../models/User'
import { Model, Op } from 'sequelize'
import { validatorEmail } from '../helpers/validateEmail'
import createUserToken from '../helpers/createUserToken'

export default class UserController {
   static async signupUser(req: Request, res: Response) {
      const { firstname, lastname, email, username, password, confirmPassword, imgProfile } = req.body
      console.log(firstname)

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
         })

         return createUserToken(newUser, req, res)
      } catch (error) {
         console.error(error)
         return res.status(500).json({ message: 'Error connect server!' })
      }
   }

   static async signinUser(req: Request, res: Response) {
      const { email, password } = req.body

      if (!email) {
         return res.status(422).json({ message: 'E-mail is required!' })
      }

      if (!password) {
         return res.status(422).json({ message: 'Password is required!' })
      }

      const user: Model | any = await User.findOne({ where: { email } })

      if (!user) {
         return res.status(404).json({ message: 'E-mail or password wrong!' })
      }

      const checkPasswordUser = await bcrypt.compare(password, user.password)

      if (!checkPasswordUser) {
         return res.status(404).json({ message: 'E-mail or password wrong!' })
      }

      try {
         createUserToken(user, req, res)
      } catch (error) {
         console.error(error)
         return res.status(500).json({ message: 'Error connect server!' })
      }
   }

   static async checkedUserToken(req: Request, res: Response) {
      try {
         return res.status(200).json(req.user)
      } catch (error) {
         console.error(error)
         return res.status(500).json({ message: 'Error connect server!' })
      }
   }
}
