import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@libs/prisma'
import { User } from '@prisma/client'
import { getUserProfile, signInUser } from '@modules/user/api'
import {
  createLoginHistory,
  deleteSession,
  persistSession,
  verifiedUserAccount,
} from '@modules/auth/api'

export const REFRESH_ERROR = 'Refresh Error'

export default NextAuth({
  // debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      // id: 'credentials',
      name: 'credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'your.email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (
        credentials,
        req
      ): Promise<Omit<User, 'password'> | null> => {
        if (!credentials) {
          return null
        } else {
          const [user, error] = await signInUser(
            credentials.email,
            credentials.password
          )

          if (error === null) return user
          else Promise.reject(new Error(error.key))
        }
        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.AUTH_FACEBOOK_ID!,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET!,
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      // const [userRecord, error] = await getUserProfile(user.id)
      // if (error) return false
      if (account.provider === 'credentials') return user.id !== undefined
      // https://next-auth.js.org/configuration/pages
      // if (account.provider === 'google' || account.provider === 'facebook') {
      //   if (profile.email_verified) {
      //     await createLoginHistory(user.id)
      //     // if user record exist and user
      //     // if (profile.email_verified) return true
      //     return true
      //   }
      // } else if (account.provider === 'credentials') {
      //   if (user.email_verified) {
      //     await createLoginHistory(user.id)
      //     return true
      //   }
      // }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    jwt: async ({ token, profile, account, user }) => {
      // console.log('in jwt token', token)
      // console.log('in jwt account', account)
      // const user = getUserProfile
      return token
    },
    session: async ({ session, token, user }) => {
      // console.log('in session session', session)
      // console.log('in session token', token)
      // console.log('in session user', user)
      const [userRecord, error] = await getUserProfile(token.sub as string)
      session.user.id = userRecord!.id!
      session.user.emailVerified = userRecord!.emailVerified
      return session
    },
  },
  events: {
    createUser: async ({ user }) => {
      // This user will be created by next auth from oauth so account auto verified
      await verifiedUserAccount(user.id)
    },
    signIn: async ({ user }) => {
      await persistSession(user.id, user)
      await createLoginHistory(user.id)
    },
    signOut: async ({ token }) => {
      await deleteSession(token.sub as string)
    },
  },
  pages: {
    signIn: '/auth/signin',
    // // signOut: '/auth/signout',
    // error: '/auth/signin', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
})
