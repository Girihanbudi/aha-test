import prisma from '@libs/prisma'

/**
 * Get Average Session by dayFunction.
 * return: number of average session in application
 */
const getAverageSessions = async (inDays: number): Promise<number> => {
  // Look up record in database
  const now = new Date()
  const averageSession = await prisma.session.count({
    where: {
      expires: {
        gt: now,
      },
      createdAt: {
        gte: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - inDays
        ),
      },
    },
  })
  return Math.ceil(averageSession / inDays)
}

export default getAverageSessions
