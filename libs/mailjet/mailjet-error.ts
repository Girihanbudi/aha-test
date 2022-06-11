import { ErrorCode } from '@common/error-code'

export class MailjetError implements ErrorCode {
  static readonly MAILJET_RES_401 = new MailjetError(
    'MAILJET_RES_401',
    'Unauthorized, wrong mailjet API Key',
    401
  )

  static readonly MAILJET_RES_400 = new MailjetError(
    'MAILJET_RES_400',
    'Bad request, wrong mailjet API request',
    400
  )

  static readonly MAILJET_SYS_500 = new MailjetError(
    'MAILJET_RES_500',
    'Internal Server Error',
    500
  )

  // private to disallow creating other instances of this type
  private constructor(
    public readonly key: string,
    public readonly errorEn: string,
    public readonly code: number
  ) {}
}

export const errorList = Object.getOwnPropertyNames(MailjetError).filter(
  (name) => name.startsWith('MAILJET')
)

export default MailjetError
