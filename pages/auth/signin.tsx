import * as React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
// COMPONENTS
import FullScreenContainer from '@components/full-screen-container'
import ContentContainer from '@components/content-container'
import SignInForm from '@modules/auth/signin-form'

interface SignInProps {
  error: string
}

const SignInPage: NextPage<SignInProps> = ({ error }: SignInProps) => {
  return (
    <FullScreenContainer>
      <ContentContainer>
        <SignInForm error={error} />
      </ContentContainer>
    </FullScreenContainer>
  )
}

export const getServerSideProps: GetServerSideProps<SignInProps> = async (
  ctx
) => {
  const session = await getSession(ctx)
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/home',
      },
    }
  } else {
    return {
      props: {
        error: ctx.query.error ? (ctx.query.error as string) : '',
      },
    }
  }
}

export default SignInPage
