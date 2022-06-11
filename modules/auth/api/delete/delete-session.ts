import prisma from '@libs/prisma'
import jwt from 'jwt-simple'

/**
 * Delete Record session Function
 */
const deleteSession = async (userId: string) => {
  await prisma.session.deleteMany({
    where: {
      userId: userId,
    },
  })
}

export default deleteSession
