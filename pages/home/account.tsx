import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useAppDispatch } from '@store/index'
// COMPONENT
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  MenuList,
  ListItemIcon,
} from '@mui/material'
import AppBar from '@components/appbar'
import UserMenu from '@modules/user/user-menu'
import FloatingPaper from '@components/floating-paper'
import MenuItem from '@components/menu-item'
import ChangePasswordDialog from '@modules/user/dialog/change-password-dialog'
import DeleteAccountDialog from '@modules/user/dialog/delete-account-dialog'
// ICON
import LockIcon from '@mui/icons-material/Lock'
import DeleteIcon from '@mui/icons-material/Delete'
// ACTION
import { fetchUserProfile } from '@store/actions/user-action'

const Account = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [])

  const [openChangePwdDialog, setChangePwdDialog] = useState<boolean>(false)
  const [openDeleteDialog, setDeleteDialog] = useState<boolean>(false)

  return (
    <Box>
      <AppBar titleLink="/home">
        <UserMenu />
      </AppBar>
      {/* Content */}
      <Box sx={{ padding: 3 }}>
        {/* <UserProfile /> */}
        <Grid
          container
          spacing={2}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Grid item xs={12} sm={12} md={6}>
            <FloatingPaper>
              <Box sx={{ padding: 2 }}>
                <Paper variant="outlined" sx={{ padding: 2 }}>
                  <Typography textAlign="center" variant="h5">
                    {t('TITLE_ACCOUNT_SETTING')}
                  </Typography>

                  <Box sx={{ py: 2 }}>
                    <Divider />
                  </Box>

                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        setChangePwdDialog(true)
                      }}
                    >
                      <ListItemIcon>
                        <LockIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="inherit">
                        {t('MENU_CHANGE_PASSWORD')}
                      </Typography>
                    </MenuItem>
                    <ChangePasswordDialog
                      open={openChangePwdDialog}
                      handleClose={() => {
                        setChangePwdDialog(false)
                      }}
                    />

                    <MenuItem
                      type="danger"
                      onClick={() => {
                        setDeleteDialog(true)
                      }}
                    >
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="inherit">
                        {t('MENU_DELETE_ACCOUNT')}
                      </Typography>
                    </MenuItem>
                    <DeleteAccountDialog
                      open={openDeleteDialog}
                      handleClose={() => {
                        setDeleteDialog(false)
                      }}
                    />
                  </MenuList>
                </Paper>

                {/* {user.errors.length > 0 && (
                <ImportantTextBox>
                  {user.errors.map((error) => (
                    <Typography>{t(error)}</Typography>
                  ))}
                </ImportantTextBox>
              )} */}
              </Box>
            </FloatingPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
    }
  } else if (session.user.emailVerified === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/home/request-verify',
      },
    }
  } else {
    return {
      props: {},
    }
  }
}

export default Account
