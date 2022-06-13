import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { getSession } from 'next-auth/react'
import { useAppDispatch } from '@store/index'
import moment from 'moment'
import validator from 'validator'
// COMPONENT
import {
  Box,
  Typography,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
} from '@mui/material'
import AppBar from '@components/appbar'
import FloatingPaper from '@components/floating-paper'
import UserMenu from '@modules/user/user-menu'
// ACTION
import {
  fetchUsers,
  fetchUserProfile,
  fetchUsersCount,
} from '@store/actions/user-action'
import {
  fetchSessionsCount,
  fetchSessionsAverage,
} from '@store/actions/session-action'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

const userColumns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  {
    field: 'createdAt',
    headerName: 'Created At',
    flex: 1,

    renderCell(params) {
      return (
        <Tooltip title={moment(new Date(params.value)).fromNow()}>
          <Typography variant="subtitle2">{params.value}</Typography>
        </Tooltip>
      )
    },
  },
  { field: 'email', headerName: 'Email', flex: 1 },
  {
    field: 'numberOfLogin',
    headerName: 'Number of Login',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
  },
  {
    field: 'lastSession',
    headerName: 'Last Session',
    flex: 1,

    renderCell(params) {
      return (
        <Tooltip title={moment(new Date(params.value)).fromNow()}>
          <Typography variant="subtitle2">{params.value}</Typography>
        </Tooltip>
      )
    },
  },
]

interface UserProps {
  limit: number
  page: number
}

const UserPage = ({ limit, page }: UserProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [])

  const users = fetchUsers()
  const usersCount = fetchUsersCount()
  const sessionsCount = fetchSessionsCount()
  const sessionsAverage = fetchSessionsAverage()

  const changePage = (limit?: number, page?: number) => {
    // https://github.com/nextauthjs/next-auth/issues/1210#issuecomment-782630909

    router.push({
      pathname: '/home/users',
      query: {
        limit: limit,
        page: page,
      },
    })
  }

  const [expanded, setExpanded] = React.useState<boolean>(true)
  const handleChange = () => {
    setExpanded(!expanded)
  }

  return (
    <Box>
      <AppBar titleLink="/home">
        <UserMenu />
      </AppBar>
      {/* Content */}
      <Box sx={{ padding: 3 }}>
        <Accordion
          elevation={0}
          sx={{ m: 0, p: 0 }}
          expanded={expanded}
          onChange={() => handleChange()}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="statisticbh-content"
            id="statisticbh-header"
            sx={{ maxWidth: 160, m: 0, p: 0 }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {t('TITLE_STATISTIC')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ m: 0, p: 0 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <FloatingPaper sx={{ mr: 2, my: 1, p: 2, maxWidth: 300 }}>
                <Typography textAlign="right" variant="body2">
                  {t('CARD_USER_COUNT')}
                </Typography>
                <Typography
                  sx={{ textAlign: 'right', fontWeight: 'bold' }}
                  variant="h5"
                >
                  {usersCount ? usersCount : <CircularProgress size={30} />}
                </Typography>
              </FloatingPaper>

              <FloatingPaper sx={{ mr: 2, my: 1, p: 2, maxWidth: 300 }}>
                <Typography textAlign="right" variant="body2">
                  {t('CARD_ACTIVE_SESSION')}
                </Typography>
                <Typography
                  sx={{ textAlign: 'right', fontWeight: 'bold' }}
                  variant="h5"
                >
                  {sessionsCount ? (
                    sessionsCount
                  ) : (
                    <CircularProgress size={30} />
                  )}
                </Typography>
              </FloatingPaper>

              <FloatingPaper sx={{ mr: 2, my: 1, p: 2, maxWidth: 300 }}>
                <Typography textAlign="right" variant="body2">
                  {t('CARD_AVG_ACTIVE_SESSION')}
                </Typography>
                <Typography
                  sx={{ textAlign: 'right', fontWeight: 'bold' }}
                  variant="h5"
                >
                  {sessionsAverage ? (
                    sessionsAverage
                  ) : (
                    <CircularProgress size={30} />
                  )}
                </Typography>
              </FloatingPaper>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ my: 4, height: 300, width: '100%' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {t('TITLE_USER_DATA')}
          </Typography>
          <DataGrid
            rows={users}
            columns={userColumns}
            sx={{ mt: 2 }}
            pagination
            page={page - 1}
            pageSize={limit}
            onPageSizeChange={(newPageSize) => changePage(newPageSize, page)}
            onPageChange={(page) => changePage(limit, page)}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
          />
        </Box>
        {/* <SessionViewer /> */}
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps<UserProps> = async (
  ctx
) => {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
    }
  } else {
    const qLimit = ctx.query.limit as string
    const qPage = ctx.query.qPage as string
    const limit = qLimit && validator.isNumeric(qLimit) ? parseInt(qLimit) : 25
    const page = qPage && validator.isNumeric(qPage) ? parseInt(qPage) : 1

    return {
      props: {
        limit: limit,
        page: page,
      },
    }
  }
}

export default UserPage
