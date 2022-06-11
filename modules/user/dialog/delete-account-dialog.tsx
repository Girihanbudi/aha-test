import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
// COMPONENTS
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import ImportantTextBox from '@components/important-text-box'
// ICONS
import WarningIcon from '@mui/icons-material/Warning'
import { deleteUserAccount } from '@store/actions/user-action'

interface DeleteAccountDialogProps {
  open: boolean
  handleClose: () => void
}

const DeleteAccountDialog = ({
  open,
  handleClose,
}: DeleteAccountDialogProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const [errors, setErrors] = useState<string[]>([])

  const handleDeleteAccount = async () => {
    const deleteErrors = await deleteUserAccount()
    setErrors(deleteErrors)

    if (deleteErrors.length === 0) router.push('/')
  }

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle align="center" fontWeight={'bold'} sx={{ my: 1 }}>
          {t('TITLE_DELETE_ACCOUNT')}
        </DialogTitle>
        <DialogContent>
          <ImportantTextBox sx={{ p: 2 }}>
            <Box>
              <WarningIcon color="error" sx={{ fontSize: 50 }} />
            </Box>
            {errors.length > 0
              ? errors.map((error, i) => (
                  <Typography key={i}>{t(error)}</Typography>
                ))
              : t('TEXT_DELETE_ACCOUNT')}
          </ImportantTextBox>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            {t('BTN_CANCEL')}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteAccount()}
            autoFocus
          >
            {t('BTN_DELETE')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default DeleteAccountDialog
