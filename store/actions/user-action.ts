import { ResponseAPI } from './../../common/response-api'
import { DefaultError } from '@common/error-code'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosFetch, axiosFetcher } from '@libs/axios'
import useSWR from 'swr'
import { User } from 'next-auth'
import { AxiosRequestConfig } from 'axios'

export const fetchUsers = (limit: number = 25, page: number = 1): User[] => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: '/api/users',
    params: {
      limit: limit,
      page: page,
    },
  }

  const { data } = useSWR<User[]>(config, axiosFetcher, {
    refreshInterval: 60 * 1000,
  })

  return data ? data : []
}

// Generates pending, fullfiled and rejected action types
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async () => {
    const [code, res] = await axiosFetch({
      method: 'get',
      url: `/api/users/my-profile`,
    })

    return res
  }
)

export const fetchUsersCount = (): number | undefined => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: '/api/users/count',
  }

  const { data } = useSWR<number>(config, axiosFetcher, {
    refreshInterval: 60 * 1000,
  })
  return data
}

export const registerUser = async (
  email: string,
  name: string,
  password: string
): Promise<[number, ResponseAPI]> => {
  const [code, res] = await axiosFetch({
    method: 'post',
    url: '/api/users/',
    data: {
      email: email,
      name: name,
      password: password,
    },
  })

  return [code, res]
}

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (name: string) => {
    const [code, res] = await axiosFetch({
      method: 'put',
      url: `/api/users/my-profile`,
      data: {
        name: name,
      },
    })

    return res
  }
)

export const changeUserPassword = async (
  currentPassword: string | null,
  newPassword: string
): Promise<string[]> => {
  try {
    const [code, res] = await axiosFetch({
      method: 'put',
      url: '/api/users/password',
      data: {
        currentPassword,
        newPassword,
      },
    })

    return res.header.errorCodes
  } catch (err) {
    return [DefaultError.DEFAULT_SYS_500.key]
  }
}

export const deleteUserAccount = async (): Promise<string[]> => {
  try {
    const [code, res] = await axiosFetch({
      method: 'delete',
      url: '/api/users/my-account',
    })

    return res.header.errorCodes
  } catch (err) {
    return [DefaultError.DEFAULT_SYS_500.key]
  }
}
