import { User } from '../models/User'
declare global {
   namespace Express {
      export interface Request {
         user: Partial<User>
      }
   }
}
