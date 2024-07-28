import { Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET: Secret | any = process.env.JWT_SECRET

const createUserToken = (user: any, req: Request, res: Response) => {
   const token = jwt.sign(
      {
         id: user.id,
      },
      JWT_SECRET,
      { expiresIn: '4h' },
   )

   return res.status(200).json({ user: user.id, token })
}

export default createUserToken
