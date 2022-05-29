import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
// COMPONENT
import useMediaQuery from '@mui/material/useMediaQuery'
import {
  Box,
  Typography,
  Input,
  InputAdornment,
  FormHelperText,
  FormControl,
  Divider,
  Popper,
  IconButton,
} from '@mui/material'
import { PaperProps } from '@mui/material/Paper'
import AlignedButtonIcon from '@components/aligned-button-icon/aligned-button-icon'
import FloatingPaper from '@components/floating-paper'
import ActionButton from '@components/action-button'
import Link from '@components/link'
// ICONS
import EmailIcon from '@mui/icons-material/Email'
import HttpsIcon from '@mui/icons-material/Https'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
import CancelIcon from '@mui/icons-material/Cancel'
// HANDLERS
import { isValidEmail, isValidPassword } from './handler/validation'
import { Visibility, VisibilityOff } from '@mui/icons-material'
// CONST
import { AUTH_SIGN_IN } from '@constants/route'

interface PwdState {
  password: string
  visible: boolean
}

const DefaultPwdState: PwdState = {
  password: '',
  visible: false,
}

const signUpForm = (props: PaperProps) => {
  let properWidth = '400px'
  const matchesWidth = useMediaQuery(`(min-width:${properWidth})`)

  const { t, i18n } = useTranslation()
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string | undefined>(undefined)
  const emailHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const [validEmail, errorCode] = isValidEmail(e.target.value)
    setEmail(e.target.value)
    setEmailError(errorCode)
  }

  const pwdErrAnchor = useRef<Element | null>(null)
  const [pwd, setPwd] = useState<PwdState>({ ...DefaultPwdState })
  const [rePwd, setRePwd] = useState<PwdState>({ ...DefaultPwdState })
  const [pwdErrors, setPwdErrors] = useState<string[]>([])

  const pwdHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const [validPwd, errorCodes] = isValidPassword(
      e.target.value,
      rePwd.password
    )
    setPwd((prevPwd) => {
      let newPwd = { ...prevPwd }
      newPwd.password = e.target.value
      return newPwd
    })
    setPwdErrors(errorCodes)
  }

  const rePwdHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const [validPwd, errorCodes] = isValidPassword(pwd.password, e.target.value)
    setRePwd((prevPwd) => {
      let newPwd = { ...prevPwd }
      newPwd.password = e.target.value
      return newPwd
    })
    setPwdErrors(errorCodes)
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

  const disabledSignUpButton = (): boolean => {
    return !(
      email !== '' &&
      pwd.password !== '' &&
      rePwd.password !== '' &&
      emailError === undefined &&
      pwdErrors.length === 0
    )
  }

  return (
    <FloatingPaper
      shadowdensity={matchesWidth ? undefined : 0}
      sx={{
        p: 4,
        width: matchesWidth ? properWidth : '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...props}
    >
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
        Sign Up
      </Typography>
      <Box pt={4}>
        <form action="">
          <Box py={1.5}>
            <FormControl
              variant="standard"
              fullWidth
              required
              error={emailError !== undefined}
            >
              <Input
                id="input-email"
                value={email}
                onChange={emailHandler}
                fullWidth
                placeholder="Email"
                startAdornment={
                  <InputAdornment position="start">
                    <EmailIcon
                      color={emailError !== undefined ? 'error' : 'inherit'}
                    />
                  </InputAdornment>
                }
              />
              <Box>
                <FormHelperText sx={{ textAlign: 'right' }}>
                  {emailError && t(emailError)}
                </FormHelperText>
              </Box>
            </FormControl>
          </Box>
          <Box py={1.5}>
            <FormControl
              variant="standard"
              fullWidth
              required
              error={pwdErrors.length > 0}
            >
              <Input
                id="input-password"
                type={pwd.visible ? 'text' : 'password'}
                value={pwd.password}
                onChange={pwdHandler}
                fullWidth
                placeholder="Password"
                error={pwdErrors.length > 0}
                startAdornment={
                  <InputAdornment position="start">
                    <HttpsIcon
                      color={pwdErrors.length > 0 ? 'error' : 'inherit'}
                    />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle-password-visibility"
                      onClick={(e) => handleShowPassword(setPwd)}
                      edge="end"
                    >
                      {pwd.visible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>

          <Box py={1.5}>
            <FormControl
              variant="standard"
              fullWidth
              required
              error={pwdErrors.length > 0}
            >
              <Input
                id="input-retype-password"
                type={rePwd.visible ? 'text' : 'password'}
                ref={pwdErrAnchor}
                value={rePwd.password}
                onChange={rePwdHandler}
                fullWidth
                placeholder="Retype Password"
                error={pwdErrors.length > 0}
                startAdornment={
                  <InputAdornment position="start">
                    <HttpsIcon
                      color={pwdErrors.length > 0 ? 'error' : 'inherit'}
                    />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle-retype-password-visibility"
                      onClick={(e) => handleShowPassword(setRePwd)}
                      edge="end"
                    >
                      {rePwd.visible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box pt={2} pb={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ActionButton variant="contained" disabled={disabledSignUpButton()}>
              SIGN UP
            </ActionButton>
          </Box>
        </form>
      </Box>

      <Box>
        <Divider />
        <Box sx={{ mt: -1.5, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ px: 2, backgroundColor: 'white' }}>
            <Typography align="center">or sign up with</Typography>
          </Box>
        </Box>
      </Box>

      <Box py={2}>
        <Box width="100%" pt={1}>
          <AlignedButtonIcon color="error" icon={<GoogleIcon />}>
            <Box sx={{ py: 0.25, ml: -4 }}>
              <Typography align="center">Google</Typography>
            </Box>
          </AlignedButtonIcon>
        </Box>
        <Box width="100%" pt={1}>
          <AlignedButtonIcon color="info" icon={<FacebookIcon />}>
            <Box sx={{ py: 0.25, ml: -4 }}>
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
          <Typography align="center">Already have an account?</Typography>
          <Box sx={{ pl: 0.5 }}>
            <Link href={AUTH_SIGN_IN}>Sign In</Link>
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
