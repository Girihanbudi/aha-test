import type { NextApiRequest, NextApiResponse } from 'next'
import ResponseAPI, { generateHeader } from '@common/response-api'
import { deleteUser } from '@modules/user/api'
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

  // DELETE METHOD - Delete user account
  const deleteAccount = async () => {
    const error = await deleteUser(session.user.id)

    return res.status(error ? error.code : 200).json({
      header: generateHeader(
        startTime,
        error
          ? 'Failed to delete user account'
          : 'Successfully delete user account',
        error ? [error.key] : [],
        error ? error.errorEn : ''
      ),
    })
  }

  // Request Method Switch Statement
  switch (req.method) {
    // Delete user
    case 'DELETE':
      await deleteAccount()
      break
    // Return not allowed method
    default:
      res.status(405).end(`Method with ${req.method} Not allowed`)
      break
  }
}

export default handler
