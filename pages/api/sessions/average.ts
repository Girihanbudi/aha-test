import type { NextApiRequest, NextApiResponse } from 'next'
import ResponseAPI, { generateHeader } from '@common/response-api'
import { getAverageSession } from '@modules/auth/api'
import { getSession } from 'next-auth/react'
import AuthError from '@modules/auth/auth-error'

type NextApiRequestProps = NextApiRequest & {
  query: {
    inDays?: number
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

  // GET METHOD - Get average
  const getAverage = async () => {
    const sessionsCount = await getAverageSession(
      req.query.inDays ? req.query.inDays : 7
    )

    return res.status(200).json({
      header: generateHeader(startTime, 'Successfully get sessions average'),
      data: sessionsCount,
    })
  }

  // Request Method Switch Statement
  switch (req.method) {
    // Get average of sessions
    case 'GET':
      await getAverage()
      break
    // Return not allowed method
    default:
      res.status(405).end(`Method with ${req.method} Not allowed`)
      break
  }
}

export default handler
