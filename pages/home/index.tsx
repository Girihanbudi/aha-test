import React from 'react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

const HomePage = () => {
  return <></>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
    }
  } else if (session.user.emailVerified === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/home/request-verify',
      },
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/home/users',
      },
    }
  }
}

export default HomePage
