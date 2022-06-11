import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
// COMPONENTS
import { Box, Typography } from '@mui/material'
import Link from '@components/link'
import useMediaQuery from '@mui/material/useMediaQuery'
import FullScreenContainer from '@components/full-screen-container'
import ContentContainer from '@components/content-container'
import ActionButton from '@components/action-button'
import OutlinedInput from '@components/outlined-input'
import FloatingPaper from '@components/floating-paper'
import ImportantTextBox from '@components/important-text-box'
import { MOBILE } from '@constants/screen-size'
// ICONS
import EmailIcon from '@mui/icons-material/Email'
import UserError from '@modules/user/user-error'
import validator from 'validator'
import { requestNewResetToken } from '@store/actions/auth-action'

const VerifyAccount = () => {
  const isNotMobile = useMediaQuery(`(min-width:${MOBILE})`)
  const { t } = useTranslation()

  // Email state ===
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string | undefined>(undefined)
  const emailHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const isValidEmail = validator.isEmail(e.target.value)
    setEmail(e.target.value)
    console.log(email, e.target.value)
    setEmailError(isValidEmail ? undefined : UserError.USER_EML_001.key)
  }

  const [errors, setErrors] = useState<string[]>([])
  const [message, setMessage] = useState<string>('')

  const handleSubmitResetPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    const errors = await requestNewResetToken(email)
    if (errors.length > 0) {
      setErrors(errors)
      setMessage('')
    } else {
      setErrors([])
      setMessage('TEXT_RESET_PWD_SUCCESS')
    }
  }

  return (
    <FullScreenContainer>
      <ContentContainer>
        <FloatingPaper
          shadowdensity={isNotMobile ? undefined : 0}
          sx={{
            p: 3,
            width: isNotMobile ? '400px' : '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
              {t('TITLE_RESET_PWD')}
            </Typography>
            <form onSubmit={handleSubmitResetPassword}>
              <Box pt={4}>
                <OutlinedInput
                  formControlProps={{
                    required: true,
                    error: emailError !== undefined,
                    size: 'small',
                  }}
                  inputProps={{
                    id: 'email',
                    type: 'email',
                    value: email,
                    placeholder: 'Email',
                    onChange: emailHandler,
                  }}
                  helperText={emailError && t(emailError)}
                  startAdornment={
                    <EmailIcon
                      color={emailError !== undefined ? 'error' : 'inherit'}
                    />
                  }
                />
              </Box>
              <Box
                pt={1}
                pb={2}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <ActionButton fullWidth variant="contained" type="submit">
                  {t('BTN_SUBMIT')}
                </ActionButton>
              </Box>
            </form>

            <Box>
              {(errors.length > 0 || message) && (
                <ImportantTextBox sx={{ mb: 1 }}>
                  {errors.map((error) => (
                    <Typography key={error}>{t(error)}</Typography>
                  ))}
                  <Typography>{t(message)}</Typography>
                </ImportantTextBox>
              )}
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Link href="/auth/signin">{t('LINK_BACK_TO_SIGNIN')}</Link>
            </Box>
          </Box>
        </FloatingPaper>
      </ContentContainer>
    </FullScreenContainer>
  )
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const token = ctx.query.token

//   // const error = await verifyAccount(token as string)

//   if (!error) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/home',
//       },
//     }
//   } else {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/home/request-verify',
//       },
//     }
//   }
// }

export default VerifyAccount
