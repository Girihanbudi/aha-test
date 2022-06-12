import prisma from '@libs/prisma'
import { User } from '@prisma/client'
import UserError from '@modules/user/user-error'
import ErrorCode from '@common/error-code'

/**
 * Change User Profile Function
 * return: edited user data or null and error or null
 */
const changeUserProfile = async (
  id: string,
  name: string
): Promise<[Omit<User, 'password'> | null, ErrorCode | null]> => {
  // Look up record in database
  const userRecord = await prisma.user.findFirst({
    where: {
      id: id,
    },
  })

  if (!userRecord) {
    // Return error record not exist
    return [null, UserError.USER_REC_001]
  } else {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        modifiedAt: new Date(),
        name: name,
      },
    })
    return [updatedUser, null]
  }
}

export default changeUserProfile
