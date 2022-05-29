import * as React from 'react'
import FullScreenContainer from '@components/full-screen-container'
import ContentContainer from '@components/content-container'

import SignUpForm from '@modules/auth/signup-form'

const signUpPage = () => {
  return (
    <FullScreenContainer>
      <ContentContainer>
        <SignUpForm />
      </ContentContainer>
    </FullScreenContainer>
  )
}

export default signUpPage
