import ResponseAPI, { ServerErrorResponseAPI } from '@common/response-api'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'

const defaultAxios = axios.create()
defaultAxios.defaults.baseURL = process.env.BASE_URL!
defaultAxios.defaults.timeout = 2500

export const axiosFetch = async (
  config: AxiosRequestConfig
): Promise<[number, ResponseAPI]> => {
  try {
    const res = await axios(config)

    if (res.status < 300) {
      return [res.status, res.data]
    }
  } catch (e: any) {
    const error = e as AxiosError
    if (error.response) {
      const data = error.response.data as unknown as ResponseAPI
      return [error.response.status, data]
    }
  }

  return [500, { ...ServerErrorResponseAPI }]
}

export const axiosFetcher = (config: AxiosRequestConfig) =>
  axios(config).then((res) => res.data.data)

export default defaultAxios
