import type { NextApiRequest, NextApiResponse } from 'next'
import ResponseAPI, { generateHeader } from '@common/response-api'
import { getUsers, signUpUser } from '@modules/user/api'
import { sendVerifyToken } from '@modules/auth/api'
import Schema from 'validate'
import { DefaultError } from '@common/error-code'
import { getSession } from 'next-auth/react'
import { AuthError } from '@modules/auth'
import validator from 'validator'

type NextApiRequestProps = NextApiRequest & {
  body: {
    email?: string
    name?: string
    password?: string
  }
  query: {
    limit: string
    page: string
  }
}

const handler = async (
  req: NextApiRequestProps,
  res: NextApiResponse<ResponseAPI>
) => {
  const startTime = new Date()

  // GET METHOD - Register User
  const getAllUsers = async () => {
    const session = await getSession({ req })
    if (!session) {
      const error = AuthError.AUTH_ACS_401
      return res.status(error.code).end()
    }

    const limit = validator.isNumeric(req.query.limit)
      ? parseInt(req.query.limit)
      : req.query.limit
    const page = validator.isNumeric(req.query.page)
      ? parseInt(req.query.page)
      : req.query.page

    if (typeof limit === 'string' || typeof page === 'string') {
      const error = DefaultError.DEFAULT_SCM_001
      return res.status(error.code).json({
        header: generateHeader(
          startTime,
          'Failed to get users',
          [error.key],
          error.errorEn
        ),
      })
    }

    const users = await getUsers(limit, page)

    return res.status(200).json({
      header: generateHeader(startTime, 'Successfuly to get all users', []),
      data: users,
    })
  }

  // POST METHOD - Register User
  const registerUser = async () => {
    const postSchema = new Schema({
      email: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    })

    const schemaErrors = postSchema.validate(req.body)

    if (schemaErrors.length > 0) {
      const error = DefaultError.DEFAULT_SCM_001
      return res.status(error.code).json({
        header: generateHeader(
          startTime,
          'Failed to create user',
          [error.key],
          schemaErrors.join(', ')
        ),
      })
    }

    const [user, errors] = await signUpUser(
      req.body.email,
      req.body.name,
      req.body.password
    )

    if (errors) {
      return res.status(errors[0].code).json({
        header: generateHeader(
          startTime,
          'Failed to create user',
          [...errors.map((error) => error.key)],
          errors.map((error) => error.errorEn).join(', ')
        ),
      })
    } else {
      if (user && user.email) {
        const error = await sendVerifyToken(
          user.email,
          process.env.BASE_URL! + '/auth/verify-account'
        )
        return res.status(error ? error.code : 201).json({
          header: generateHeader(
            startTime,
            error
              ? 'Failed to create user'
              : 'Successfully create new user, check registered email inbox or spam for verification link',
            error ? [error.key] : [],
            error ? error.errorEn : ''
          ),
        })
      }
    }
  }

  // Request Method Switch Statement
  switch (req.method) {
    case 'GET':
      await getAllUsers()
      break
    case 'POST':
      await registerUser()
      break
    // Return not allowed method
    default:
      res.status(405).end(`Method with ${req.method} Not allowed`)
      break
  }
}

export default handler
