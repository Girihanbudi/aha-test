import prisma from '@libs/prisma'
import UserError from '../../user-error'
import ErrorCode from '@common/error-code'

/**
 * Delete User Account Function
 * return: error or null
 */
const deleteUser = async (id: string): Promise<ErrorCode | null> => {
  // Look up record in database
  const userRecord = await prisma.user.findFirst({
    where: {
      id: id,
    },
  })

  if (!userRecord) return UserError.USER_REC_001

  // Delete user in database
  await prisma.user.delete({
    where: {
      id: userRecord.id,
    },
  })

  return null
}

export default deleteUser
