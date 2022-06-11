import type { NextApiRequest, NextApiResponse } from 'next'
import ResponseAPI, { generateHeader } from '@common/response-api'
import { changeUserProfile, getUserProfile } from '@modules/user/api'
import { getSession } from 'next-auth/react'
import AuthError from '@modules/auth/auth-error'
import Schema from 'validate'
import { DefaultError } from '@common/error-code'

type NextApiRequestProps = NextApiRequest & {
  body: {
    name?: string
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

  // GET METHOD - Get related user profile
  const getProfile = async () => {
    const [user, error] = await getUserProfile(session.user.id)

    return res.status(error ? error.code : 200).json({
      header: generateHeader(
        startTime,
        error ? 'Failed to get user profile' : 'Successfully get user profile',
        error ? [error.key] : [],
        error?.errorEn
      ),
      data: user,
    })
  }

  // PUT METHOD - Change user profile
  const editProfile = async () => {
    const putSchema = new Schema({
      name: {
        type: String,
        required: true,
      },
    })

    const schemaErrors = putSchema.validate(req.body)

    if (schemaErrors.length > 0) {
      const error = DefaultError.DEFAULT_SCM_001
      return res.status(error.code).json({
        header: generateHeader(
          startTime,
          'Failed to edit user profile',
          [error.key],
          schemaErrors.join(', ')
        ),
      })
    }

    const [user, error] = await changeUserProfile(
      session.user.id,
      req.body.name
    )

    return res.status(error ? error.code : 200).json({
      header: generateHeader(
        startTime,
        error
          ? 'Failed to change user profile'
          : 'Successfully change user name',
        error ? [error.key] : [],
        error ? error.errorEn : ''
      ),
      data: user,
    })
  }

  // Request Method Switch Statement
  switch (req.method) {
    case 'GET':
      await getProfile()
      break
    // Edit user profile
    case 'PUT':
      await editProfile()
      break
    // Return not allowed method
    default:
      res.status(405).end(`Method with ${req.method} Not allowed`)
      break
  }
}

export default handler
