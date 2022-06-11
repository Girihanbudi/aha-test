import * as React from 'react'
import { NextPage, GetServerSideProps } from 'next'
// ACTIONS
import { verifyAccount } from '@store/actions/auth-action'

const VerifyAccount: NextPage = () => {
  return <></>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.query.token

  const error = await verifyAccount(token as string)

  if (!error) {
    return {
      redirect: {
        permanent: false,
        destination: '/home',
      },
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/home/request-verify',
      },
    }
  }
}

export default VerifyAccount
