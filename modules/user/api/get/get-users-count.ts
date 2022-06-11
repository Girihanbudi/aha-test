import prisma from '@libs/prisma'

/**
 * Get User Total count Function.
 * return: number of user that already signup
 */
const getUsersCount = async (): Promise<number> => {
  // Look up record in database
  const usersCount = await prisma.user.count({})
  return usersCount
}

export default getUsersCount
