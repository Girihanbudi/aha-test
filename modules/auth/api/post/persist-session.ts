import prisma from '@libs/prisma'
import jwt from 'jwt-simple'
import { deleteSession } from '../delete'

/**
 * Create Session data for dashboard information Function
 */
const persistSession = async (userId: string, token: any) => {
  await deleteSession(token.sub)
  console.log(jwt.encode(token, process.env.JWT_SECRET!))
  await prisma.session.create({
    data: {
      createdAt: new Date(),
      sessionToken: jwt.encode(token, process.env.JWT_SECRET!),
      userId: userId,
      expires: new Date(Date.now() + 3600 * 1000 * 24 * 30),
    },
  })
}

export default persistSession
