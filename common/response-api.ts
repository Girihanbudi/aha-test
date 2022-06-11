import { getTimeSpent } from '@utils/time'

// Response API in JSON return as header information
export interface ResponseHeader {
  processTime: number // time spent for processing api endpoint function
  message: string // message for response after hit api endpoint e.g. successfully | error
  reason: string // general reason related to response message
  errorCodes: string[] // errror list if any
}

export const generateHeader = (
  startTime: Date,
  message: string = '',
  errorCodes: string[] = [],
  reason: string = ''
): ResponseHeader => {
  return {
    processTime: getTimeSpent(startTime, new Date()),
    message: message,
    reason: reason,
    errorCodes: errorCodes,
  }
}

// Response API in general
export interface ResponseAPI {
  header: ResponseHeader
  data?: any // requested data response
}

export const ServerErrorResponseAPI: ResponseAPI = {
  header: {
    processTime: 0,
    message: 'Failed to fetch data',
    reason: 'Internal Server Error',
    errorCodes: [],
  },
}

export default ResponseAPI
