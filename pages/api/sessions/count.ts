import type { NextApiRequest, NextApiResponse } from 'next'
import ResponseAPI, { generateHeader } from '@common/response-api'
import { getSessionsCount } from '@modules/auth/api'
import { getSession } from 'next-auth/react'
import AuthError from '@modules/auth/auth-error'

type NextApiRequestProps = NextApiRequest & {
  query: {
    active?: boolean
  }
}

const handler = async (
  req: NextApiRequestProps,
  res: NextApiResponse<ResponseAPI>
) => {
  const session = await getSession({ req })
  if (!session) {
    const error = AuthError.AUTH_ACS_401
    return res.status(error.code).end()
  }

  const startTime = new Date()

  // GET METHOD - Get count
  const getCount = async () => {
    const sessionsCount = await getSessionsCount(req.query.active)

    return res.status(200).json({
      header: generateHeader(startTime, 'Successfully get sessions count'),
      data: sessionsCount,
    })
  }

  // Request Method Switch Statement
  switch (req.method) {
    // Get count of sessions
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
