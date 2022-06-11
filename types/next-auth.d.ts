import NextAuth from 'next-auth'
import { User } from '@prisma/client'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    // user: Omit<User, 'password'>
    user: {
      id: string
      createdAt: Date
      modifiedAt: Date
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
    }
    // error: string
  }

  interface User {
    id: string
    createdAt: Date
    modifiedAt: Date
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface JWT {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
  }
}

declare module 'next-auth/jwt' {}
