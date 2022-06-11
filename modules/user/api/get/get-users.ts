import prisma from '@libs/prisma'
import { UserSessionReport } from '../../types'
import moment from 'moment'

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
 * Get All users information for dashboard Function
 * return: UserSessionReport object array
 */
const getUsers = async (
  limit: number,
  page: number
): Promise<UserSessionReport[]> => {
  // Look up record in database using prisma ORM
  // const userRecords = await prisma.user.findMany({
  //   skip: (page - 1) * limit,
  //   take: limit,
  //   include: {
  //     loginHistories: {
  //       orderBy: {
  //         at: 'desc',
  //       },
  //       take: 1,
  //     },
  //     _count: {
  //       select: {
  //         loginHistories: true,
  //       },
  //     },
  //   },
  // })

  // raw query
  const userRecords =
    await prisma.$queryRaw`SELECT u.id, u.name, u.created_at as "createdAt", u.email, COUNT(lh.id) as "numberOfLogin", MAX(lh.at) as "lastSession"
  From users u
  LEFT JOIN login_histories lh on u.email = lh.email
  GROUP BY u.id, u.email
  ORDER BY u.name`

  const records = userRecords as UserSessionReport[]
  const usersSessionReport = records.map((user) => {
    const data: UserSessionReport = {
      id: user.id,
      name: user.name ? user.name : '',
      createdAt: moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      email: user.email ? user.email : '',
      numberOfLogin: user.numberOfLogin,
      lastSession: user.lastSession
        ? moment(user.lastSession).format('YYYY-MM-DD HH:mm:ss')
        : '',
    }

    return data
  })

  return usersSessionReport
}

export default getUsers
