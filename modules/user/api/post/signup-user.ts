import cuid from 'cuid'
import validator from 'validator'
import prisma from '@libs/prisma'
import Case from 'case'
import { hashPassword } from '@utils/bcrypt'
import { User } from '@prisma/client'
import { isValidUserPassword } from '@modules/user/handler/password-handler'
import UserError from '@modules/user/user-error'
import ErrorCode from '@common/error-code'

/**
 * Sign Up User Function
 * return: array of error or null
 */
const signUpUser = async (
  email: string,
  name: string,
  password: string
): Promise<[Omit<User, 'password'> | null, ErrorCode[] | null]> => {
  const validEmail = validator.isEmail(email)
  if (!validEmail) return [null, [UserError.USER_EML_001]]

  const [validPassword, errors] = isValidUserPassword(password)
  if (!validPassword) {
    return [null, errors]
  }

  // Look up record in database
  const userRecord = await prisma.user.findFirst({
    where: {
      email: email,
    },
  })

  if (userRecord) {
    // Return error record already exist
    return [null, [UserError.USER_REC_002]]
  } else {
    const currentTime = new Date()
    const user: User = await prisma.user.create({
      data: {
        id: cuid(),
        createdAt: currentTime,
        modifiedAt: currentTime,
        emailVerified: null,
        email: email,
        name: Case.lower(name),
        password: await hashPassword(password),
        image: '',
      },
    })
    return [user, null]
  }
}

export default signUpUser
