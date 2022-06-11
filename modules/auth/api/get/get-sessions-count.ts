import prisma from '@libs/prisma'

/**
 * Get All sessions count Function.
 * return: number of sessions in application
 */
const getSessionsCount = async (active: boolean = true): Promise<number> => {
  // Look up record in database
  let expires = {}
  if (active === true) {
    expires = {
      gt: new Date(),
    }
  } else if (active === false) {
    expires = {
      ls: new Date(),
    }
  }

  const sessionsCount = await prisma.session.count({
    where: {
      expires: expires,
    },
  })
  return sessionsCount
}

export default getSessionsCount
