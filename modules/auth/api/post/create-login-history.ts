import prisma from '@libs/prisma'

/**
 * Create Login History when user successfully login Function
 */
const createLoginHistory = async (userId: string) => {
  const userRecord = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })

  if (userRecord) {
    // Insert new record to database
    await prisma.loginHistory.create({
      data: {
        email: userRecord.email!,
      },
    })
  }
}

export default createLoginHistory
