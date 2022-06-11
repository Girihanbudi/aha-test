import type { NextApiRequest, NextApiResponse } from 'next'
import ResponseAPI, { generateHeader } from '@common/response-api'
import { getUsersCount } from '@modules/user/api'
import { getSession } from 'next-auth/react'
import AuthError from '@modules/auth/auth-error'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseAPI>
) => {
  const session = await getSession({ req })
  if (!session) {
    const error = AuthError.AUTH_ACS_401
    return res.status(error.code).end()
  }

  const startTime = new Date()

  // GET METHOD - Get users count
  const getCount = async () => {
    const usersCount = await getUsersCount()

    return res.status(200).json({
      header: generateHeader(startTime, 'Successfully get users count'),
      data: usersCount,
    })
  }

  // Request Method Switch Statement
  switch (req.method) {
    // Get user
    case 'GET':
      await getCount()
      break
    // Return not allowed method
    default:
      res.status(405).end(`Method with ${req.method} Not allowed`)
      break
  }
}

export default handler
