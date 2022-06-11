import prisma from '@libs/prisma'
import { User } from '@prisma/client'
import UserError from '../../user-error'
import ErrorCode from '@common/error-code'

export function excludeUser<User, Key extends keyof User>(
  user: User,
  ...keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key]
  }
  return user
}

/**
 * Get User Profile Function
 * return: user object or null and error or null
 */
const getUserProfile = async (
  id: string
): Promise<[Omit<User, 'password'> | null, ErrorCode | null]> => {
  // Look up record in database
  const userRecord = await prisma.user.findFirst({
    where: {
      id: id,
    },
  })

  if (userRecord) {
    // Return user recorde without password column
    const userWithoutPassword = excludeUser(userRecord, 'password')
    return [
      userWithoutPassword,
      userWithoutPassword ? null : UserError.USER_REC_001,
    ]
  }
  return [null, UserError.USER_REC_001]
}

export default getUserProfile
