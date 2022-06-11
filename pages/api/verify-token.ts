import type { NextApiRequest, NextApiResponse } from 'next'
import ResponseAPI, { generateHeader } from '@common/response-api'
import { checkVerifyToken, sendVerifyToken } from '@modules/auth/api'
import { getSession } from 'next-auth/react'
import AuthError from '@modules/auth/auth-error'
import Schema from 'validate'
import { DefaultError } from '@common/error-code'
type NextApiRequestProps = NextApiRequest & {
  body: {
    token?: string
  }
}

const handler = async (
  req: NextApiRequestProps,
  res: NextApiResponse<ResponseAPI>
) => {
  const startTime = new Date()

  // GET METHOD - Get verify token
  const requestVerifyToken = async () => {
    const session = await getSession({ req })
    if (!session) {
      const error = AuthError.AUTH_ACS_401
      return res.status(error.code).end()
    }

    const error = await sendVerifyToken(
      session.user.email!,
      process.env.BASE_URL! + '/auth/verify-account'
    )
    return res.status(error ? error.code : 201).json({
      header: generateHeader(
        startTime,
        error
          ? 'Failed to request verify token'
          : 'Successfully request verify token, check registered email inbox or spam for verification link',
        error ? [error.key] : [],
        error ? error.errorEn : ''
      ),
    })
  }
  // PUT METHOD - Get count
  const verifyUserToken = async () => {
    const putSchema = new Schema({
      token: {
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
          'Failed to verify user token',
          [error.key],
          schemaErrors.join(', ')
        ),
      })
    }

    const error = await checkVerifyToken(req.body.token)

    return res.status(error ? error.code : 200).json({
      header: generateHeader(
        startTime,
        error ? 'Failed to verify user token' : 'Successfully verify user token'
      ),
    })
  }

  // Request Method Switch Statement
  switch (req.method) {
    // GET verify token
    case 'GET':
      await requestVerifyToken()
      break
    // PUT verifying user token
    case 'PUT':
      await verifyUserToken()
      break
    // Return not allowed method
    default:
      res.status(405).end(`Method with ${req.method} Not allowed`)
      break
  }
}

export default handler
