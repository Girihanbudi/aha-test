import { ErrorCode } from '@common/error-code'

export class UserError implements ErrorCode {
  static readonly USER_ACC_001 = new UserError(
    'USER_ACC_001',
    'User created with other oauth',
    401
  )

  static readonly USER_CDT_001 = new UserError(
    'USER_CDT_001',
    'Login credential provided is wrong',
    401
  )

  static readonly USER_REC_001 = new UserError(
    'USER_REC_001',
    'User record not found',
    404
  )

  static readonly USER_REC_002 = new UserError(
    'USER_REC_002',
    'Email already used',
    409
  )

  static readonly USER_FLD_001 = new UserError(
    'USER_FLD_001',
    'Field cannot be empty',
    400
  )

  static readonly USER_EML_001 = new UserError(
    'USER_EML_001',
    'User email is invalid',
    400
  )

  static readonly USER_PWD_001 = new UserError(
    'USER_PWD_001',
    'Password need contains at least one lower character',
    400
  )

  static readonly USER_PWD_002 = new UserError(
    'USER_PWD_002',
    'Password need contains at least one upper character',
    400
  )

  static readonly USER_PWD_003 = new UserError(
    'USER_PWD_003',
    'Password need contains at least one digit character',
    400
  )

  static readonly USER_PWD_004 = new UserError(
    'USER_PWD_004',
    'Password need contains at least one special character',
    400
  )

  static readonly USER_PWD_005 = new UserError(
    'USER_PWD_005',
    'Password need contains at least one 8 character',
    400
  )

  static readonly USER_PWD_006 = new UserError(
    'USER_PWD_006',
    `Password and retype password doesn't match`,
    400
  )

  static readonly USER_PWD_007 = new UserError(
    'USER_PWD_007',
    `Old password doesn't match`,
    400
  )

  // private to disallow creating other instances of this type
  private constructor(
    public readonly key: string,
    public readonly errorEn: string,
    public readonly code: number
  ) {}
}

export const errorList = Object.getOwnPropertyNames(UserError).filter((name) =>
  name.startsWith('USER')
)

export default UserError
