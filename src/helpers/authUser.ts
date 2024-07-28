import { NextFunction, Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models/User'

dotenv.config()
const JWT_SECRET: Secret | any = process.env.JWT_SECRET

type JwtPayloud = {
   id: number
}

const authUser = async (req: Request, res: Response, next: NextFunction) => {
   const { authorization } = req.headers

   if (!authorization) {
      return res.status(401).json({ message: 'User unauthorizaded!' })
   }

   const token = authorization.split(' ')[1]

   const decoded = jwt.verify(token, JWT_SECRET) as JwtPayloud

   const user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } })

   if (!user) {
      return res.status(401).json({ message: 'User unauthorizaded!!' })
   }

   req.user = user

   next()
}

export default authUser
