import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import validator from 'validator'
import { axiosFetch } from '@libs/axios'
import Case from 'case'
// COMPONENTS
import useMediaQuery from '@mui/material/useMediaQuery'
import { Box, Typography, Divider, IconButton, Popper } from '@mui/material'
import { PaperProps } from '@mui/material/Paper'
import ImportantTextBox from '@components/important-text-box'
import AlignedButtonIcon from '@components/aligned-button-icon/aligned-button-icon'
import FloatingPaper from '@components/floating-paper'
import OutlinedInput from '@components/outlined-input'
import ActionButton from '@components/action-button'
import Link from '@components/link'
// ICONS
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
import HttpsIcon from '@mui/icons-material/Https'
import CancelIcon from '@mui/icons-material/Cancel'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
// ERROR
import UserError from '@modules/user/user-error'
// HANDLER
import { isValidUserPassword } from '@modules/user/handler/password-handler'
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

interface SignUpFormProps extends PaperProps {
  csrfToken: string
}

const signUpForm = (props: SignUpFormProps) => {
  const isNotMobile = useMediaQuery(`(min-width:${MOBILE})`)
  const router = useRouter()

  const { t } = useTranslation()

  const [message, setMessage] = useState<string>('')

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

  // Name state ===
  const [name, setName] = useState<string>('')
  const [nameError, setNameError] = useState<string | undefined>(undefined)

  const nameHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(Case.title(e.target.value))
    if (e.target.value !== '') {
      setNameError(undefined)
    } else {
      setNameError(UserError.USER_FLD_001.key)
    }
  }

  // Password state ===
  const pwdErrAnchor = useRef<Element | null>(null)
  const [pwd, setPwd] = useState<PwdState>({ ...DefaultPwdState })
  const [rePwd, setRePwd] = useState<PwdState>({ ...DefaultPwdState })
  const [pwdErrors, setPwdErrors] = useState<string[]>([])

  const pwdHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const [isValidPwd, errors] = isValidUserPassword(
      e.target.value,
      rePwd.password
    )
    setPwd((prevPwd) => {
      let newPwd = { ...prevPwd }
      newPwd.password = e.target.value
      return newPwd
    })
    setPwdErrors([...errors.map((error) => error.key)])
  }

  const rePwdHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const [isValidPwd, errors] = isValidUserPassword(
      pwd.password,
      e.target.value
    )
    setRePwd((prevPwd) => {
      let newPwd = { ...prevPwd }
      newPwd.password = e.target.value
      return newPwd
    })
    setPwdErrors([...errors.map((error) => error.key)])
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

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Return if contain any error
    if (
      emailError !== undefined ||
      nameError !== undefined ||
      pwdErrors.length > 0
    )
      return

    const data = {
      email: email,
      name: name,
      password: pwd.password,
    }

    const [code, res] = await axiosFetch({
      method: 'post',
      url: '/api/users/',
      data: data,
    })

    if (code !== 201) {
      setMessage(t(res.header.errorCodes.map((error) => error)))
    } else {
      signIn('credentials', {
        email: email,
        password: pwd.password,
        callbackUrl: `/home`,
      })
    }
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
        {t('AUTH_SIGNUP')}
      </Typography>

      {/* Sign up with credential */}
      <Box pt={2}>
        {message && (
          <ImportantTextBox sx={{ mb: 1 }}>{message}</ImportantTextBox>
        )}

        <form onSubmit={handleSignUp}>
          {/* Email Input */}
          <Box py={0.5}>
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
          {/* Name Input */}
          <Box py={0.5}>
            <OutlinedInput
              formControlProps={{
                required: true,
                error: nameError !== undefined,
                size: 'small',
              }}
              inputProps={{
                id: 'input-name',
                type: 'name',
                value: name,
                color: nameError !== undefined ? 'error' : 'primary',
                placeholder: t('INPUT_PLACEHOLDER_NAME'),
                onChange: nameHandler,
              }}
              helperText={nameError && t(nameError)}
              startAdornment={
                <PersonIcon
                  color={nameError !== undefined ? 'error' : 'inherit'}
                />
              }
            />
          </Box>
          {/* Password Input */}
          <Box py={0.5}>
            <OutlinedInput
              formControlProps={{
                required: true,
                error: pwdErrors.length > 0,
                size: 'small',
              }}
              inputProps={{
                type: pwd.visible ? 'text' : 'password',
                value: pwd.password,
                onChange: pwdHandler,
                placeholder: t('INPUT_PLACEHOLDER_PWD'),
                error: pwdErrors.length > 0,
              }}
              startAdornment={
                <HttpsIcon color={pwdErrors.length > 0 ? 'error' : 'inherit'} />
              }
              endAdornment={
                <IconButton
                  aria-label="toggle-password-visibility"
                  onClick={(e) => handleShowPassword(setPwd)}
                  edge="end"
                >
                  {pwd.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              }
            />
          </Box>
          {/* Retype Password Input */}
          <Box py={0.5}>
            <OutlinedInput
              formControlProps={{
                required: true,
                error: pwdErrors.length > 0,
                size: 'small',
              }}
              inputProps={{
                id: 'input-retype-password',
                type: rePwd.visible ? 'text' : 'password',
                ref: pwdErrAnchor,
                value: rePwd.password,
                onChange: rePwdHandler,
                placeholder: t('INPUT_PLACEHOLDER_REPWD'),
                error: pwdErrors.length > 0,
              }}
              startAdornment={
                <HttpsIcon color={pwdErrors.length > 0 ? 'error' : 'inherit'} />
              }
              endAdornment={
                <IconButton
                  aria-label="toggle-retype-password-visibility"
                  onClick={(e) => handleShowPassword(setRePwd)}
                  edge="end"
                >
                  {rePwd.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              }
            />
          </Box>
          <Box pt={2} pb={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ActionButton fullWidth variant="contained" type="submit">
              {t('BTN_SUBMIT')}
            </ActionButton>
          </Box>
        </form>
      </Box>

      {/* Form Divider */}
      <Box>
        <Divider />
        <Box sx={{ mt: -1.5, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ px: 2, backgroundColor: 'white' }}>
            <Typography align="center">{t('AUTH_CONTINUE_WITH')}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Or Continue with other auth */}
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
          <Typography align="center">{t('AUTH_HAVE_ACCOUNT')}</Typography>
          <Box sx={{ pl: 0.5 }}>
            <Link href="/auth/signin">{t('AUTH_SIGNIN')}</Link>
          </Box>
        </Box>
      </Box>

      {/* ERROR POPPER */}
      <Popper
        open={
          pwdErrors.length > 0 && (pwd.password !== '' || rePwd.password !== '')
        }
        anchorEl={pwdErrAnchor.current}
        placement="bottom-start"
        disablePortal={true}
      >
        <Box sx={{ ml: 2 }}>
          <FloatingPaper shadowdensity={0.3} sx={{ p: 2 }}>
            {pwdErrors.map((error) => (
              <Box key={error} sx={{ display: 'flex' }}>
                <CancelIcon sx={{ pr: 1 }} color="error" />
                <Typography color="error" variant="body2">
                  {t(error)}
                </Typography>
              </Box>
            ))}
          </FloatingPaper>
        </Box>
      </Popper>
    </FloatingPaper>
  )
}

export default signUpForm
