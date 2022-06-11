import { ErrorCode } from '@common/error-code'

export class AuthError implements ErrorCode {
  static readonly AUTH_NIL_001 = new AuthError(
    'AUTH_NIL_001',
    'Email field not provided for processing',
    400
  )

  static readonly AUTH_ACS_401 = new AuthError(
    'AUTH_ACS_401',
    'Unauthorized, lacks valid authentication credentials for the target resource',
    401
  )

  static readonly AUTH_TKN_404 = new AuthError(
    'AUTH_TKN_404',
    'Invalid token to be verified',
    404
  )

  static readonly AUTH_TKN_400 = new AuthError(
    'AUTH_TKN_400',
    'Invalid token, token has been expired',
    400
  )

  static readonly OAuthAccountNotLinked = new AuthError(
    'OAuthAccountNotLinked',
    'Your email associated has been used by other account, try signin with other method',
    401
  )

  static readonly CredentialsSignin = new AuthError(
    'CredentialsSignin',
    'Wrong email or password provided',
    401
  )

  // private to disallow creating other instances of this type
  private constructor(
    public readonly key: string,
    public readonly errorEn: string,
    public readonly code: number
  ) {}
}

export const errorList = Object.getOwnPropertyNames(AuthError).filter((name) =>
  name.startsWith('AUTH')
)

export default AuthError
