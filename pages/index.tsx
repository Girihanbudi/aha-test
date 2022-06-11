import React from 'react'
import { useTranslation } from 'react-i18next'
// COMPONENTS
import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import AppHeader from '@components/app-header'
import AppBar from '@components/appbar'
import Link from '@components/link/link'
import FullScreenContainer from '@components/full-screen-container'
import ActionButton from '@components/action-button'

const Index = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <FullScreenContainer>
      <Box sx={{ position: 'absolute', top: 0 }} width="100%">
        <AppHeader title={'Aha - Landing Page'} />
        <AppBar>
          <Link
            href="/auth/signin"
            sx={{ color: theme.mainColor.disabled[500] }}
          >
            {t('BTN_LOGIN')}
          </Link>
        </AppBar>
      </Box>

      <Grid container>
        <Grid item xs={12} sm={6} md={6}>
          <Box sx={{ p: 2, mt: 8 }}>
            <Typography variant="h2">{t('TEXT_WELCOME_TO_AHA')}</Typography>
            <Typography variant="h5">{t('TEXT_INDEX_SUBTITLE')}</Typography>
            <Box sx={{ pt: 4 }}>
              <Link href="/auth/signup">
                <ActionButton variant="contained">
                  {t('BTN_SIGNUP')}
                </ActionButton>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </FullScreenContainer>
  )
}

export default Index
