import * as React from 'react'
import FullScreenContainer from '@components/full-screen-container'
import ContentContainer from '@components/content-container'

import SignInForm from '@modules/auth/signin-form'

const signUpPage = () => {
  return (
    <FullScreenContainer>
      <ContentContainer>
        <SignInForm />
      </ContentContainer>
    </FullScreenContainer>
  )
}

export default signUpPage
