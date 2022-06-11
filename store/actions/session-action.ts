import { axiosFetcher } from '@libs/axios'
import { AxiosRequestConfig } from 'axios'
import useSWR from 'swr'

export const fetchSessionsCount = (
  active: boolean = true
): number | undefined => {
  let uri = '/api/sessions/count'
  if (active !== undefined) uri += `?active=${active}`

  const config: AxiosRequestConfig = {
    method: 'get',
    url: uri,
  }

  const { data } = useSWR<number>(config, axiosFetcher, {
    refreshInterval: 60 * 1000,
  })
  return data
}

export const fetchSessionsAverage = (
  inDays: number = 7
): number | undefined => {
  let uri = '/api/sessions/average'
  if (inDays !== undefined) uri += `?inDays=${inDays}`

  const config: AxiosRequestConfig = {
    method: 'get',
    url: uri,
  }

  const { data } = useSWR<number>(config, axiosFetcher, {
    refreshInterval: 60 * 1000,
  })
  return data
}
