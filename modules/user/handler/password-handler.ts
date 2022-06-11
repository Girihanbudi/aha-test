import { LOWER_CASE, UPPER_CASE, NUMERIC, SPECIAL_CHAR } from '@constants/regex'
import ErrorCode from '@common/error-code'
import { UserError } from '../user-error'

export const isValidUserPassword = (
  password: string,
  retypePassword?: string
): [boolean, ErrorCode[]] => {
  const containLower = LOWER_CASE.test(password)
  const containUpper = UPPER_CASE.test(password)
  const containDigit = NUMERIC.test(password)
  const containSpecial = SPECIAL_CHAR.test(password)
  const min8Char = password.length >= 8

  const isValid =
    containLower && containUpper && containDigit && containSpecial && min8Char

  let errors = []
  if (!containLower) errors.push(UserError.USER_PWD_001)
  if (!containUpper) errors.push(UserError.USER_PWD_002)
  if (!containDigit) errors.push(UserError.USER_PWD_003)
  if (!containSpecial) errors.push(UserError.USER_PWD_004)
  if (!min8Char) errors.push(UserError.USER_PWD_005)
  if (retypePassword !== undefined && retypePassword !== password)
    errors.push(UserError.USER_PWD_006)

  return [isValid, errors]
}
