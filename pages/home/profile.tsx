import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useAppDispatch } from '@store/index'
// COMPONENT
import { Box } from '@mui/material'
import AppBar from '@components/appbar'
import UserMenu from '@modules/user/user-menu'
import UserProfile from '@modules/user/user-profile'
// ACTION
import { fetchUserProfile } from '@store/actions/user-action'

const Profile = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [])

  return (
    <Box>
      <AppBar titleLink="/home">
        <UserMenu />
      </AppBar>
      {/* Content */}
      <Box sx={{ padding: 3 }}>
        <UserProfile />
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

export default Profile
