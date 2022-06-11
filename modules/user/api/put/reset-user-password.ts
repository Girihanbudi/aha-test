import prisma from '@libs/prisma'
import UserError from '@modules/user/user-error'
import ErrorCode from '@common/error-code'
import { hashPassword } from '@utils/bcrypt'

/**
 * Reset User Password Function
 * return: error or null
 */
const resetUserPassword = async (
  id: string,
  newPassword: string
): Promise<ErrorCode | null> => {
  // Look up record in database
  const userRecord = await prisma.user.findFirst({
    where: {
      id: id,
    },
  })

  if (!userRecord) {
    // Return error record not exist
    return UserError.USER_REC_001
  } else {
    await prisma.user.update({
      where: {
        id: userRecord.id,
      },
      data: {
        modifiedAt: new Date(),
        password: await hashPassword(newPassword),
      },
    })
    return null
  }
}

export default resetUserPassword
