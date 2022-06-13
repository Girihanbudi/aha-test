import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { signIn } from 'next-auth/react'
import validator from 'validator'
// COMPONENTS
import json2mq from 'json2mq'
import {
  Box,
  Typography,
  Divider,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import { PaperProps } from '@mui/material/Paper'
import AlignedButtonIcon from '@components/aligned-button-icon/aligned-button-icon'
import FloatingPaper from '@components/floating-paper'
import OutlinedInput from '@components/outlined-input'
import ActionButton from '@components/action-button'
import Link from '@components/link'
import ImportantTextBox from '@components/important-text-box'
// ICONS
import EmailIcon from '@mui/icons-material/Email'
import HttpsIcon from '@mui/icons-material/Https'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
import { Visibility, VisibilityOff } from '@mui/icons-material'
// ERROR
import UserError from '@modules/user/user-error'
// CONSTANTS
import { MOBILE } from '@constants/screen-size'

interface PwdState {
  password: string
  visible: boolean
}

const DefaultPwdState: PwdState = {
  password: '',
  visible: false,
}

interface SignInFormProps extends PaperProps {
  error?: string
}

const signInForm = (props: SignInFormProps) => {
  const isNotMobile = useMediaQuery(json2mq({ minWidth: MOBILE }))

  const { t } = useTranslation()

  // Email state ===
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string | undefined>(undefined)
  const emailHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const isValidEmail = validator.isEmail(e.target.value)
    setEmail(e.target.value)
    setEmailError(isValidEmail ? undefined : UserError.USER_EML_001.key)
  }

  // Password state
  const [pwd, setPwd] = useState<PwdState>({ ...DefaultPwdState })
  const [pwdError, setPwdError] = useState<boolean>(false)
  const pwdHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPwd((prevPwd) => {
      let newPwd = { ...prevPwd }
      newPwd.password = e.target.value
      return newPwd
    })
    setPwdError(e.target.value ? false : true)
  }
  const handleShowPassword = (
    pwdSetter: React.Dispatch<React.SetStateAction<PwdState>>
  ) => {
    pwdSetter((prevPwd) => {
      let newPwd = { ...prevPwd }
      newPwd.visible = !newPwd.visible
      return newPwd
    })
  }

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Return if contain any error
    if (emailError !== undefined) return

    signIn('credentials', {
      email: email,
      password: pwd.password,
      callbackUrl: `/home`,
    })
  }

  return (
    <FloatingPaper
      shadowdensity={isNotMobile ? undefined : 0}
      sx={{
        p: 3,
        width: isNotMobile ? '400px' : '100vw',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...props}
    >
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
        {t('AUTH_SIGNIN')}
      </Typography>
      {/* Sign in with credential */}
      <Box pt={2}>
        {props.error && (
          <ImportantTextBox sx={{ mb: 1 }}>{t(props.error)}</ImportantTextBox>
        )}
        <form onSubmit={handleSignIn}>
          {/* Email Input */}
          <Box py={0.5}>
            <OutlinedInput
              formControlProps={{
                required: true,
                error: emailError !== undefined,
                size: 'small',
              }}
              inputProps={{
                id: 'input-email',
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
          {/* Password Input */}
          <Box py={0.5}>
            <OutlinedInput
              formControlProps={{
                required: true,
                error: pwdError,
                size: 'small',
              }}
              inputProps={{
                type: pwd.visible ? 'text' : 'password',
                value: pwd.password,
                onChange: pwdHandler,
                placeholder: t('INPUT_PLACEHOLDER_PWD'),
                error: pwdError,
              }}
              startAdornment={
                <HttpsIcon color={pwdError ? 'error' : 'inherit'} />
              }
              endAdornment={
                <IconButton
                  aria-label="toggle-password-visibility"
                  onClick={(e) => handleShowPassword(setPwd)}
                  edge="end"
                >
                  {pwd.visible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              }
            />
          </Box>
          <Box pt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ActionButton fullWidth variant="contained" type="submit">
              {t('BTN_LOGIN')}
            </ActionButton>
          </Box>
        </form>
        <Box sx={{ pt: 2, pb: 6, display: 'flex', justifyContent: 'center' }}>
          <Link href="/auth/forgot-password">{t('AUTH_FORGOT_PASSWORD')}</Link>
        </Box>
      </Box>

      {/* Form divider */}
      <Box>
        <Divider />
        <Box sx={{ mt: -1.5, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ px: 2, backgroundColor: 'white' }}>
            <Typography align="center">{t('AUTH_CONTINUE_WITH')}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Sign in with other auth */}
      <Box py={2}>
        <Box width="100%" pt={1}>
          <AlignedButtonIcon
            color="error"
            icon={<GoogleIcon />}
            onClick={() => signIn('google', { callbackUrl: `/home` })}
          >
            <Box sx={{ py: 0.25, ml: -3 }}>
              <Typography align="center">Google</Typography>
            </Box>
          </AlignedButtonIcon>
        </Box>
        <Box width="100%" pt={1}>
          <AlignedButtonIcon
            color="info"
            icon={<FacebookIcon />}
            onClick={() => signIn('facebook', { callbackUrl: `/home` })}
          >
            <Box sx={{ py: 0.25, ml: -3 }}>
              <Typography align="center">Facebook</Typography>
            </Box>
          </AlignedButtonIcon>
        </Box>
      </Box>

      <Box sx={{ py: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography align="center">{t('AUTH_DONT_HAVE_ACCOUNT')}</Typography>
          <Box sx={{ pl: 0.5 }}>
            <Link href="/auth/signup">{t('AUTH_SIGNUP')}</Link>
          </Box>
        </Box>
      </Box>
    </FloatingPaper>
  )
}

export default signInForm
