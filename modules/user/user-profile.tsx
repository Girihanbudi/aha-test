import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import { RootState, AppDispatch } from '@store/index'
import { useSelector, useDispatch } from 'react-redux'
// COMPONENT
import {
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  IconButton,
  Typography,
  Skeleton,
  Avatar,
} from '@mui/material'
import FloatingPaper from '@components/floating-paper'
import ImportantTextBox from '@components/important-text-box'
// ICON
import EditIcon from '@mui/icons-material/Edit'
// REDUX ACTION
import { updateUserProfile } from '@store/actions/user-action'

const UserProfileSkeleton = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <Grid item xs={12} sm={12} md={6}>
        <FloatingPaper>
          <Box sx={{ backgroundColor: 'black', p: 8, borderRadius: 5 }} />
          <Box sx={{ mt: -5, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ backgroundColor: 'white', p: 1, borderRadius: 50 }}>
              <Skeleton variant="circular">
                <Avatar sx={{ width: 75, height: 75 }} />
              </Skeleton>
            </Box>
          </Box>
          <Box sx={{ p: 2 }}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid
                  container
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  {Array.from(Array(2), (e, i) => {
                    return (
                      <Grid key={i} item sx={{ px: 2 }} xs={12} sm={12} md={6}>
                        <Box sx={{ mt: 2 }}>
                          <Skeleton width="100px" />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                          <Skeleton />
                        </Box>
                      </Grid>
                    )
                  })}
                </Grid>
              </Box>
            </Paper>
          </Box>
        </FloatingPaper>
      </Grid>
    </Grid>
  )
}

const UserProfile = () => {
  const { t } = useTranslation()
  const { data: session, status } = useSession()

  // Redux
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  // State
  const [name, setName] = useState<string>('')
  const [editMode, setEditMode] = useState<boolean>(false)

  const handleClickEdit = () => {
    setEditMode(true)
    setName(user.data && user.data.name ? user.data.name : '')
  }

  const handleEditName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value)
  }

  const handleClickClose = () => {
    setEditMode(false)
  }

  const handleSubmitName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(updateUserProfile(name))
    setEditMode(false)
  }

  if (user.loading || !user.data) {
    return <UserProfileSkeleton />
  }

  if (!session) {
    return <></>
  } else {
    return (
      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Grid item xs={12} sm={12} md={6}>
          <FloatingPaper>
            <Box sx={{ backgroundColor: 'black', p: 8, borderRadius: 5 }} />
            <Box sx={{ mt: -5, display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ backgroundColor: 'white', p: 1, borderRadius: 50 }}>
                {user.data.image ? (
                  <Avatar
                    alt=""
                    src={user.data.image}
                    sx={{ width: 75, height: 75 }}
                  />
                ) : (
                  <Avatar alt="" src="" sx={{ width: 75, height: 75 }}>
                    {!user.data.image && (
                      <Typography variant="h4">
                        {user.data.name?.split(' ').map((word, i) => {
                          if (i < 2) return word[0].toUpperCase()
                        })}
                      </Typography>
                    )}
                  </Avatar>
                )}
              </Box>
            </Box>
            <Box sx={{ p: 2 }}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Grid
                    container
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Grid item sx={{ px: 2 }} xs={12} sm={12} md={6}>
                      <Box sx={{ mt: 2 }}>
                        <Typography sx={{ fontWeight: 'bold' }}>
                          {t('INPUT_TITLE_EMAIL')}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: 1 }}>
                        <Typography>{user.data.email}</Typography>
                      </Box>
                    </Grid>
                    <Grid item sx={{ px: 2 }} xs={12} sm={12} md={6}>
                      <Box sx={{ mt: 2 }}>
                        <Typography sx={{ fontWeight: 'bold' }}>
                          {t('INPUT_TITLE_NAME')}
                        </Typography>
                      </Box>
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          {editMode ? (
                            <Box width="100%">
                              <form onSubmit={handleSubmitName}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  required
                                  value={name}
                                  onChange={handleEditName}
                                />
                                <Box
                                  sx={{
                                    my: 1,
                                    display: 'flex',
                                    justifyContent: 'right',
                                  }}
                                >
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={() => handleClickClose()}
                                    sx={{ mr: 1 }}
                                  >
                                    {t('BTN_CANCEL')}
                                  </Button>
                                  <Button
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                  >
                                    {t('BTN_SAVE')}
                                  </Button>
                                </Box>
                              </form>
                            </Box>
                          ) : (
                            <>
                              <Typography>{user.data.name}</Typography>
                              <IconButton
                                onClick={() => {
                                  handleClickEdit()
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>

              {user.errors.length > 0 && (
                <ImportantTextBox>
                  {user.errors.map((error) => (
                    <Typography>{t(error)}</Typography>
                  ))}
                </ImportantTextBox>
              )}
            </Box>
          </FloatingPaper>
        </Grid>
      </Grid>
    )
  }
}

export default UserProfile
