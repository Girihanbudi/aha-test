import validator from 'validator'
import AUTH_ERROR_CODE from '../error/auth-error-code'

var SPECIAL_CHAR = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

export const isValidEmail = (email: string): [boolean, string | undefined] => {
  const isValid = validator.isEmail(email)
  return [isValid, !isValid ? AUTH_ERROR_CODE.AUTH_EML_001 : undefined]
}

export const isValidPassword = (
  password: string,
  retypePassword?: string
): [boolean, string[]] => {
  const containLower = /[a-z]/.test(password)
  const containUpper = /[A-Z]/.test(password)
  const containDigit = /[0-9]/.test(password)
  const containSpecial = SPECIAL_CHAR.test(password)
  const min8Char = password.length >= 8

  const isValid =
    containLower && containUpper && containDigit && containSpecial && min8Char

  let errors = []
  if (!containLower) errors.push(AUTH_ERROR_CODE.AUTH_PWD_001)
  if (!containUpper) errors.push(AUTH_ERROR_CODE.AUTH_PWD_002)
  if (!containDigit) errors.push(AUTH_ERROR_CODE.AUTH_PWD_003)
  if (!containSpecial) errors.push(AUTH_ERROR_CODE.AUTH_PWD_004)
  if (!min8Char) errors.push(AUTH_ERROR_CODE.AUTH_PWD_005)
  if (retypePassword !== undefined && retypePassword !== password)
    errors.push(AUTH_ERROR_CODE.AUTH_PWD_006)

  return [isValid, errors]
}
