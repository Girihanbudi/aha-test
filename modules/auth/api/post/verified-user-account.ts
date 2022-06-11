import prisma from '@libs/prisma'

/**
 * Update User email verified after clicking verified in email inbox Function
 */
const verifiedUserAccount = async (userId: string) => {
  // Insert new record to database
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerified: new Date(),
    },
  })
}

export default verifiedUserAccount
