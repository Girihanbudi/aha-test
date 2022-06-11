import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
// COMPONENTS
import {
  Box,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  List,
} from '@mui/material'
import OutlinedInput from '@components/outlined-input'
import ImportantTextBox from '@components/important-text-box'
// ICON
import HttpsIcon from '@mui/icons-material/Https'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { isValidUserPassword } from '../handler'
// ACTIONS
import { changeUserPassword } from '@store/actions/user-action'

interface pwdState {
  password: string
  visible: boolean
}

const DefaultPwdState: pwdState = {
  password: '',
  visible: false,
}

interface DeleteAccountDialogProps {
  open: boolean
  handleClose: () => void
}

const ChangePasswordDialog = ({
  open,
  handleClose,
}: DeleteAccountDialogProps) => {
  const { t } = useTranslation()

  // Password state
  const [currentPwd, setCurrentPwd] = useState<pwdState>({
    ...DefaultPwdState,
  })
  const reCurrentPwdHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentPwd((prevPwd) => {
      let newPwd = { ...prevPwd }
      newPwd.password = e.target.value
      return newPwd
    })
  }

  const [newPwd, setNewPwd] = useState<pwdState>({ ...DefaultPwdState })
  const [reNewPwd, setReNewPwd] = useState<pwdState>({
    ...DefaultPwdState,
  })
  const [pwdErrors, setPwdErrors] = useState<string[]>([])

  const newPwdHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const [isValidPwd, errors] = isValidUserPassword(
      e.target.value,
      reNewPwd.password
    )
    setNewPwd((prevPwd) => {
      let newPwd = { ...prevPwd }
      newPwd.password = e.target.value
      return newPwd
    })
    setPwdErrors([...errors.map((error) => error.key)])
  }

  const reNewPwdHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const [isValidPwd, errors] = isValidUserPassword(
      newPwd.password,
      e.target.value
    )
    setReNewPwd((prevPwd) => {
      let newPwd = { ...prevPwd }
      newPwd.password = e.target.value
      return newPwd
    })
    setPwdErrors([...errors.map((error) => error.key)])
  }

  const handleShowPassword = (
    pwdSetter: React.Dispatch<React.SetStateAction<pwdState>>
  ) => {
    pwdSetter((prevPwd) => {
      let newPwd = { ...prevPwd }
      newPwd.visible = !newPwd.visible
      return newPwd
    })
  }

  const handleCloseDialog = () => {
    handleClose()
    setCurrentPwd({ ...DefaultPwdState })
    setNewPwd({ ...DefaultPwdState })
    setReNewPwd({ ...DefaultPwdState })
    setPwdErrors([])
  }

  const handleSubmitChange = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (pwdErrors.length > 0) return
    const errors = await changeUserPassword(
      currentPwd.password ? currentPwd.password : null,
      newPwd.password
    )
    if (errors.length > 0) setPwdErrors(errors)
    else handleCloseDialog()
  }

  return (
    <Box>
      <Dialog open={open} onClose={handleCloseDialog} fullWidth>
        <form onSubmit={handleSubmitChange}>
          <DialogTitle align="center" fontWeight={'bold'} sx={{ my: 1 }}>
            {t('TITLE_CHANGE_PASSWORD')}
          </DialogTitle>
          <DialogContent>
            {/* Current Password Input */}
            <Box py={0.5}>
              <OutlinedInput
                formControlProps={{
                  size: 'small',
                }}
                inputProps={{
                  type: currentPwd.visible ? 'text' : 'password',
                  value: currentPwd.password,
                  onChange: reCurrentPwdHandler,
                  placeholder: t('INPUT_PLACEHOLDER_PWD'),
                }}
                startAdornment={<HttpsIcon color="inherit" />}
                endAdornment={
                  <IconButton
                    aria-label="toggle-password-visibility"
                    onClick={(e) => handleShowPassword(setCurrentPwd)}
                    edge="end"
                  >
                    {currentPwd.visible ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                }
              />
            </Box>
            {/* New Password Input */}
            <Box py={0.5}>
              <OutlinedInput
                formControlProps={{
                  required: true,
                  error: pwdErrors.length > 0,
                  size: 'small',
                }}
                inputProps={{
                  type: newPwd.visible ? 'text' : 'password',
                  value: newPwd.password,
                  onChange: newPwdHandler,
                  placeholder: t('INPUT_PLACEHOLDER_NEW_PWD'),
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
                    onClick={(e) => handleShowPassword(setNewPwd)}
                    edge="end"
                  >
                    {newPwd.visible ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                }
              />
            </Box>
            {/* Retype New Password Input */}
            <Box py={0.5}>
              <OutlinedInput
                formControlProps={{
                  required: true,
                  error: pwdErrors.length > 0,
                  size: 'small',
                }}
                inputProps={{
                  id: 'input-retype-password',
                  type: reNewPwd.visible ? 'text' : 'password',
                  value: reNewPwd.password,
                  onChange: reNewPwdHandler,
                  placeholder: t('INPUT_PLACEHOLDER_NEW_REPWD'),
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
                    onClick={(e) => handleShowPassword(setReNewPwd)}
                    edge="end"
                  >
                    {reNewPwd.visible ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                }
              />
            </Box>
            {pwdErrors.length > 0 && (
              <ImportantTextBox sx={{ mt: 1 }}>
                <List sx={{ p: 2 }}>
                  {pwdErrors.map((error, i) => (
                    <Typography key={i} textAlign="left">
                      • {t(error)}
                    </Typography>
                  ))}
                </List>
              </ImportantTextBox>
            )}
          </DialogContent>
          <DialogActions sx={{ mr: 2, mb: 2 }}>
            <Button variant="outlined" onClick={handleCloseDialog}>
              {t('BTN_CANCEL')}
            </Button>
            <Button type="submit" variant="contained">
              {t('BTN_SAVE')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}

export default ChangePasswordDialog
