import validator from 'validator'
import prisma from '@libs/prisma'
import { comparePassword } from '@utils/bcrypt'
import { User } from '@prisma/client'
import { excludeUser } from '../get/get-users'
import UserError from '@modules/user/user-error'
import ErrorCode from '@common/error-code'

/**
 * Sign In User Function
 * return: user information or nul and error or null
 */
const signInUser = async (
  email: string,
  password: string
): Promise<[Omit<User, 'password'> | null, ErrorCode | null]> => {
  const validEmail = validator.isEmail(email)
  if (!validEmail) return [null, UserError.USER_EML_001]

  // Look up record in database
  const userRecord = await prisma.user.findFirst({
    where: {
      email: email,
    },
  })

  if (!userRecord) {
    // Return error record not found
    return [null, UserError.USER_REC_001]
  } else if (!userRecord.password) {
    // Return unauthorized, login with related oauth
    return [null, UserError.USER_ACC_001]
  } else {
    // check user password
    const pwdMatch = await comparePassword(password, userRecord.password)
    if (pwdMatch) return [excludeUser(userRecord, 'password'), null]
  }

  return [null, UserError.USER_CDT_001]
}

export default signInUser
