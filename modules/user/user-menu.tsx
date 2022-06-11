import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Case from 'case'
import { RootState } from '@store/index'
import { useSelector } from 'react-redux'
// COMPONENT
import {
  Box,
  Paper,
  Button,
  IconButton,
  MenuList,
  MenuItem,
  ListItemIcon,
  Typography,
  Menu,
  Skeleton,
  Avatar,
  useMediaQuery,
} from '@mui/material'
import UserCard from './user-card'
import { useTheme } from '@mui/material/styles'
// ICON
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import LogoutIcon from '@mui/icons-material/Logout'
// CONSTANT
import { MOBILE } from '@constants/screen-size'

const UserMenuSkeleton = () => {
  const isNotMobile = useMediaQuery(`(min-width:${MOBILE})`)
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box sx={{ pr: 2 }}>
        <Skeleton
          variant="circular"
          sx={{ backgroundColor: theme.mainColor.secondary[500] }}
        >
          <Avatar />
        </Skeleton>
      </Box>

      {!isNotMobile && (
        <Skeleton
          variant="text"
          width="100px"
          sx={{ backgroundColor: theme.mainColor.secondary[500] }}
        />
      )}
    </Box>
  )
}

const UserMenuList = () => {
  const { t } = useTranslation()

  const router = useRouter()

  return (
    <Paper elevation={0} sx={{ minWidth: 350 }}>
      <MenuList>
        <MenuItem onClick={() => router.push('/home/profile')}>
          <ListItemIcon>
            <AssignmentIndIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">{t('MENU_PROFILE')}</Typography>
        </MenuItem>
        <MenuItem onClick={() => router.push('/home/account')}>
          <ListItemIcon>
            <ManageAccountsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">{t('MENU_ACCOUNT')}</Typography>
        </MenuItem>
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            {t('MENU_SIGNOUT')}
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  )
}

const UserMenu = () => {
  const isNotMobile = useMediaQuery(`(min-width:${MOBILE})`)
  const { data: session, status } = useSession()
  // Redux
  const user = useSelector((state: RootState) => state.user)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  if (user.loading || !user.data) {
    return <UserMenuSkeleton />
  }

  if (!session) {
    return <></>
  } else {
    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isNotMobile ? (
            <Button
              variant="contained"
              startIcon={
                <Avatar alt="" src={user.data.image ? user.data.image : ''} />
              }
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleUserMenu}
              color="secondary"
              sx={{ textTransform: 'none' }}
            >
              <Typography>{Case.title(user.data.name!)}</Typography>
            </Button>
          ) : (
            <IconButton onClick={handleUserMenu}>
              <Avatar alt="" src={user.data.image ? user.data.image : ''} />
            </IconButton>
          )}
        </Box>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{ p: 0, m: 0 }}
        >
          <UserCard />
          <UserMenuList />
        </Menu>
      </Box>
    )
  }
}

export default UserMenu
