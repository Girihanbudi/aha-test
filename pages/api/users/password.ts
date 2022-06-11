import type { NextApiRequest, NextApiResponse } from 'next'
import ResponseAPI, { generateHeader } from '@common/response-api'
import { changeUserPassword } from '@modules/user/api'
import { getSession } from 'next-auth/react'
import AuthError from '@modules/auth/auth-error'
import Schema from 'validate'
import { DefaultError } from '@common/error-code'

type NextApiRequestProps = NextApiRequest & {
  body: {
    currentPassword?: string | null
    newPassword?: string
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

  // PUT METHOD - Edit user password
  const changePassword = async () => {
    const putSchema = new Schema({
      currentPassword: {
        type: String,
        required: false,
      },
      newPassword: {
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
          'Failed to change user password',
          [error.key],
          schemaErrors.join(', ')
        ),
      })
    }

    const errors = await changeUserPassword(
      session.user.id,
      req.body.currentPassword,
      req.body.newPassword
    )

    return res.status(errors ? errors[0].code : 200).json({
      header: generateHeader(
        startTime,
        errors
          ? 'Failed to change user password'
          : 'Successfully change user password',
        errors ? errors.map((error) => error.key) : [],
        errors ? errors.map((error) => error.errorEn).join(', ') : ''
      ),
    })
  }

  // Request Method Switch Statement
  switch (req.method) {
    // Change user password
    case 'PUT':
      await changePassword()
      break
    // Return not allowed method
    default:
      res.status(405).end(`Method with ${req.method} Not allowed`)
      break
  }
}

export default handler
