import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { axiosFetch } from '@libs/axios'
// COMPONENTS
import {
  Box,
  IconButton,
  Typography,
  Popper,
  useMediaQuery,
} from '@mui/material'
import FullScreenContainer from '@components/full-screen-container'
import ContentContainer from '@components/content-container'
import FloatingPaper from '@components/floating-paper'
import OutlinedInput from '@components/outlined-input'
import ActionButton from '@components/action-button'
import Link from '@components/link'
import ImportantTextBox from '@components/important-text-box'
// HANDLERS
import { isValidUserPassword } from '@modules/user/handler/password-handler'
// ICONS
import HttpsIcon from '@mui/icons-material/Https'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CancelIcon from '@mui/icons-material/Cancel'
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

interface ResetPasswordPageProps {
  token: string
}

const ResetPasswordPage: NextPage<ResetPasswordPageProps> = ({
  token,
}: ResetPasswordPageProps) => {
  const isNotMobile = useMediaQuery(`(min-width:${MOBILE})`)
  const { t } = useTranslation()
  const router = useRouter()

  const [errors, setErrors] = useState<string[]>([])

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

  const handleSubmitResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    // Return if contain any error
    if (pwdErrors.length > 0) return

    const data = {
      token: token,
      newPassword: pwd.password,
    }

    const [code, res] = await axiosFetch({
      method: 'put',
      url: '/api/reset-token/',
      data: data,
    })

    if (code !== 200) {
      setErrors(res.header.errorCodes)
    } else {
      router.push('/auth/signin')
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
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
            {t('TITLE_RESET_PWD')}
          </Typography>
          <Box sx={{ pt: 2 }}>
            <form onSubmit={handleSubmitResetPassword}>
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
                    <HttpsIcon
                      color={pwdErrors.length > 0 ? 'error' : 'inherit'}
                    />
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
                    <HttpsIcon
                      color={pwdErrors.length > 0 ? 'error' : 'inherit'}
                    />
                  }
                  endAdornment={
                    <IconButton
                      aria-label="toggle-retype-password-visibility"
                      onClick={(e) => handleShowPassword(setRePwd)}
                      edge="end"
                    >
                      {rePwd.visible ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
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
              {errors.length > 0 && (
                <ImportantTextBox sx={{ mb: 1 }}>
                  {errors.map((error) => (
                    <Typography key={error}>{t(error)}</Typography>
                  ))}
                </ImportantTextBox>
              )}
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Link href="/auth/signin">{t('LINK_BACK_TO_SIGNIN')}</Link>
            </Box>
          </Box>
        </FloatingPaper>
      </ContentContainer>
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
    </FullScreenContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.query.token

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/forgot-password',
      },
    }
  } else {
    return {
      props: {
        token,
      },
    }
  }
}

export default ResetPasswordPage
