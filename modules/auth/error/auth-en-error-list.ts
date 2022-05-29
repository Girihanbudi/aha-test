import AuthErrorCode from './auth-error-code-type'

const AUTH_EN_ERROR_LIST: AuthErrorCode = {
  AUTH_EML_001: 'Email is invalid',
  AUTH_PWD_001: 'Password need contains at least one lower character',
  AUTH_PWD_002: 'Password need contains at least one upper character',
  AUTH_PWD_003: 'Password need contains at least one digit character',
  AUTH_PWD_004: 'Password need contains at least one special character',
  AUTH_PWD_005: 'Password need contains at least one 8 character',
  AUTH_PWD_006: `Password and retype password doesn't match`,
}

export default AUTH_EN_ERROR_LIST
