import * as React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { getSession, getCsrfToken } from 'next-auth/react'
// COMPONENT
import FullScreenContainer from '@components/full-screen-container'
import ContentContainer from '@components/content-container'
import SignUpForm from '@modules/auth/signup-form'

interface SignUpProps {
  csrfToken: string
}

const SignUpPage: NextPage<SignUpProps> = ({ csrfToken }: SignUpProps) => {
  return (
    <FullScreenContainer>
      <ContentContainer>
        <SignUpForm csrfToken={csrfToken} />
      </ContentContainer>
    </FullScreenContainer>
  )
}

export const getServerSideProps: GetServerSideProps<SignUpProps> = async (
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
    const csrfToken = await getCsrfToken(ctx)

    return {
      props: {
        csrfToken: csrfToken ? csrfToken : '',
      },
    }
  }
}

export default SignUpPage
