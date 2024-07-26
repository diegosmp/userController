import { Request, Response } from 'express'
import jsw from 'jsonwebtoken'

const createUserToken = (user: any, req: Request, res: Response) => {
   const token = jsw.sign(
      {
         userId: user.id,
         emailUser: user.emailUser,
      },
      'mySecretToken',
   )

   return res.status(200).json({ message: 'User create sucessfully!', userId: user.id, token })
}

export default createUserToken
