import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useAppDispatch } from '@store/index'
// COMPONENT
import { Box, Grid, Paper, Typography, Divider } from '@mui/material'
import AppBar from '@components/appbar'
import UserMenu from '@modules/user/user-menu'
import FloatingPaper from '@components/floating-paper'
import ActionButton from '@components/action-button'
import ImportantTextBox from '@components/important-text-box'
// ACTION
import { requestNewVerifyToken } from '@store/actions/auth-action'
import { fetchUserProfile } from '@store/actions/user-action'

const Account = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [])

  const [requestErrors, setRequestErrors] = useState<string[]>([])
  const [messageSuccess, setMessageSuccess] = useState<string>('')

  const handleRequestToken = async () => {
    const errors = await requestNewVerifyToken()
    if (errors.length > 0) {
      setRequestErrors(errors)
      setMessageSuccess('')
    } else {
      setRequestErrors([])
      setMessageSuccess('TEXT_VERFY_SUCCESS')
    }
  }

  return (
    <Box>
      <AppBar titleLink="/home">
        {' '}
        <UserMenu />
      </AppBar>
      {/* Content */}
      <Box sx={{ padding: 3 }}>
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
                    {t('TITLE_VERFY')}
                  </Typography>

                  <Box sx={{ py: 2 }}>
                    <Divider />
                  </Box>

                  <Typography textAlign="center">
                    {t('TEXT_VERFY_ANNOUCE')}
                  </Typography>

                  <Box sx={{ pt: 2 }}>
                    <Typography textAlign="center" sx={{ fontWeight: 'bold' }}>
                      {t('TEXT_VERFY_QUESTION')}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ pt: 1, display: 'flex', justifyContent: 'center' }}
                  >
                    <ActionButton
                      variant="contained"
                      onClick={handleRequestToken}
                    >
                      {t('BTN_VERFY_NEW_REQUEST')}
                    </ActionButton>
                  </Box>

                  {(requestErrors.length > 0 || messageSuccess !== '') && (
                    <ImportantTextBox sx={{ mt: 2 }}>
                      {requestErrors.map((error) => (
                        <Typography key={error}>{t(error)}</Typography>
                      ))}

                      <Typography>{t(messageSuccess)}</Typography>
                    </ImportantTextBox>
                  )}
                </Paper>
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
  } else if (session.user.emailVerified !== null) {
    return {
      redirect: {
        permanent: false,
        destination: '/home',
      },
    }
  } else {
    return {
      props: {},
    }
  }
}

export default Account
