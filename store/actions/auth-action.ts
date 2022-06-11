import { DefaultError } from '@common/error-code'
import { axiosFetch } from '@libs/axios'
import axios from 'axios'

export const verifyAccount = async (token: string): Promise<number> => {
  const res = await axios({
    method: 'put',
    url: process.env.BASE_URL + '/api/verify-token',
    data: {
      token,
    },
  })

  return res.status
}

export const requestNewVerifyToken = async (): Promise<string[]> => {
  try {
    const [code, res] = await axiosFetch({
      method: 'get',
      url: '/api/verify-token',
    })

    return res.header.errorCodes
  } catch (err) {
    return [DefaultError.DEFAULT_SYS_500.key]
  }
}

export const requestNewResetToken = async (
  email: string
): Promise<string[]> => {
  try {
    const [code, res] = await axiosFetch({
      method: 'get',
      url: '/api/reset-token',
      params: {
        email: email,
      },
    })

    return res.header.errorCodes
  } catch (err) {
    return [DefaultError.DEFAULT_SYS_500.key]
  }
}
