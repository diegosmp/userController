import validator from 'validator'

export const validatorEmail = (email: string): boolean | void => {
   const emailValidator = validator.isEmail(email)
   if (!emailValidator) {
      return emailValidator
   }
}
