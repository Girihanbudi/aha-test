import process from 'process'
import prisma from '@libs/prisma'

import jwt from 'jwt-simple'
import ErrorCode from '@common/error-code'
import UserError from '@modules/user/user-error'
import { User } from '@prisma/client'
import AuthError from '@modules/auth/auth-error'
import { verifiedUserAccount } from '../post'
import moment from 'moment'

/**
 * Check verify token and run verified user email by current time if token correct
 * return: error or null
 */
const checkVerifyToken = async (token: string): Promise<ErrorCode | null> => {
  const user = jwt.decode(token, process.env.JWT_SECRET!) as User
  if (!user) {
    return UserError.USER_REC_001
  }

  // Look up record in database
  const tokenRecord = await prisma.verificationToken.findFirst({
    where: {
      identifier: user.email!,
    },
  })

  if (!tokenRecord) {
    return AuthError.AUTH_TKN_404
  } else if (moment().isAfter(tokenRecord.expires))
    return AuthError.AUTH_TKN_400

  await verifiedUserAccount(user.id)

  await prisma.verificationToken.deleteMany({
    where: {
      identifier: tokenRecord.identifier,
    },
  })

  return null
}

export default checkVerifyToken
