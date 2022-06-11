import { DefaultError } from '@common/error-code'
import { createSlice } from '@reduxjs/toolkit'
import { User } from '@prisma/client'
import { fetchUserProfile, updateUserProfile } from '../actions/user-action'

export interface IUser {
  loading: boolean
  errors: string[]
  data: Omit<User, 'password'> | null
}

const initialUser: IUser = {
  loading: true,
  errors: [],
  data: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    // Fetch User Reducer
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload.data
      state.errors = action.payload.header.errorCodes
    })
    builder.addCase(fetchUserProfile.rejected, (state) => {
      state.loading = false
      state.data = null
      state.errors = [DefaultError.DEFAULT_SYS_500.key]
    })

    // Update User Reducer
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false
      // Don't update user data if data is null from backend
      if (action.payload.data) state.data = action.payload.data
      state.errors = action.payload.header.errorCodes
    })
    builder.addCase(updateUserProfile.rejected, (state) => {
      state.loading = false
      state.errors = [DefaultError.DEFAULT_SYS_500.key]
    })
  },
})

export default userSlice.reducer
