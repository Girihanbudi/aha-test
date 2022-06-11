import type { NextApiRequest, NextApiResponse } from 'next'
import ResponseAPI, { generateHeader } from '@common/response-api'
import { checkResetToken, sendResetToken } from '@modules/auth/api'
import Schema from 'validate'
import { DefaultError } from '@common/error-code'
type NextApiRequestProps = NextApiRequest & {
  query: {
    email: string
  }
  body: {
    token?: string
    newPassword?: string
  }
}

const handler = async (
  req: NextApiRequestProps,
  res: NextApiResponse<ResponseAPI>
) => {
  const startTime = new Date()

  // GET METHOD - Get verify token
  const requestResetToken = async () => {
    const getSchema = new Schema({
      email: {
        type: String,
        required: true,
      },
    })

    const schemaErrors = getSchema.validate(req.query)
    if (schemaErrors.length > 0) {
      const error = DefaultError.DEFAULT_SCM_001
      return res.status(error.code).json({
        header: generateHeader(
          startTime,
          'Failed to request reset token token',
          [error.key],
          schemaErrors.join(', ')
        ),
      })
    }

    const error = await sendResetToken(
      req.query.email,
      process.env.BASE_URL! + '/auth/reset-password'
    )
    return res.status(error ? error.code : 201).json({
      header: generateHeader(
        startTime,
        error
          ? 'Failed to request reset token'
          : 'Successfully request reset token, check registered email inbox or spam for verification link',
        error ? [error.key] : [],
        error ? error.errorEn : ''
      ),
    })
  }
  // PUT METHOD - Verify reset user password token
  const verifyResetToken = async () => {
    const putSchema = new Schema({
      token: {
        type: String,
        required: true,
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
          'Failed to verify reset token',
          [error.key],
          schemaErrors.join(', ')
        ),
      })
    }

    const error = await checkResetToken(req.body.token, req.body.newPassword)

    return res.status(error ? error.code : 200).json({
      header: generateHeader(
        startTime,
        error
          ? 'Failed to verify reset token'
          : 'Successfully verify reset token',
        error ? [error.key] : []
      ),
    })
  }

  // Request Method Switch Statement
  switch (req.method) {
    // GET verify token
    case 'GET':
      await requestResetToken()
      break
    // PUT verifying user token
    case 'PUT':
      await verifyResetToken()
      break
    // Return not allowed method
    default:
      res.status(405).end(`Method with ${req.method} Not allowed`)
      break
  }
}

export default handler
