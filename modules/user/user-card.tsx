import * as React from 'react'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import Case from 'case'
import { RootState } from '@store/index'
import { useSelector } from 'react-redux'
// COMPONENT
import {
  Skeleton,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
// CONSTANTS
import { MOBILE } from '@constants/screen-size'

const UserCardSkeleton = (isNotMobile: boolean) => {
  if (isNotMobile) {
    return (
      <Box>
        <Card sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Skeleton variant="text" width="250px" />
              <Skeleton variant="text" width="100px" />
            </CardContent>
          </Box>
          {isNotMobile && (
            <Skeleton variant="rectangular" width="300px" height="200px" />
          )}
        </Card>
      </Box>
    )
  } else {
    return (
      <Box width="100%">
        <Card sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Skeleton variant="text" width="250px" />
              <Skeleton variant="text" width="100px" />
            </CardContent>
          </Box>
        </Card>
      </Box>
    )
  }
}

const UserCard = () => {
  const { t } = useTranslation()

  const isNotMobile = useMediaQuery(`(min-width:${MOBILE})`)
  const { data: session, status } = useSession()

  // Redux
  const user = useSelector((state: RootState) => state.user)

  if (user.loading || !user.data) return UserCardSkeleton(isNotMobile)

  if (!session) {
    return <></>
  } else {
    if (isNotMobile) {
      return (
        <Box>
          <Card sx={{ display: 'flex', borderRadius: 0 }} elevation={0}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', lineHeight: 1.2 }}
                >
                  {t('CARD_WELCOME')},
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', lineHeight: 1.2 }}
                >
                  {user.data.name && Case.title(user.data.name.split(' ')[0])}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {t('CARD_AHA')}
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 200 }}
              image="/welcome.jpg"
              alt="Live from space album cover"
            />
          </Card>
        </Box>
      )
    } else {
      return (
        <Box width="100%">
          <Card sx={{ display: 'flex', borderRadius: 0 }} elevation={0}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {t('CARD_WELCOME')},{' '}
                  {Case.title(session?.user.name!.split(' ')[0])}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {t('CARD_AHA')}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Box>
      )
    }
  }
}

export default UserCard
