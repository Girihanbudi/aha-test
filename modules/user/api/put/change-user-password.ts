import prisma from '@libs/prisma'
import { hashPassword } from '@utils/bcrypt'
import { isValidUserPassword } from '@modules/user/handler/password-handler'
import UserError from '@modules/user/user-error'
import ErrorCode from '@common/error-code'
import { comparePassword } from '@utils/bcrypt'

/**
 * Change User Password Function
 * return: array of error or null
 */
const changeUserPassword = async (
  id: string,
  currenPassword: string | null,
  newPassword: string
): Promise<ErrorCode[] | null> => {
  // Look up record in database
  const userRecord = await prisma.user.findFirst({
    where: {
      id: id,
    },
  })

  if (!userRecord) {
    // Return error record not exist
    return [UserError.USER_REC_001]
  }

  if (
    userRecord.password !== null &&
    !(await comparePassword(
      currenPassword ? currenPassword : '',
      userRecord.password
    ))
  ) {
    return [UserError.USER_PWD_007]
  }

  const [validPwd, errors] = isValidUserPassword(newPassword)

  if (!validPwd) {
    return errors
  } else {
    await prisma.user.update({
      where: {
        id: userRecord.id,
      },
      data: {
        modifiedAt: new Date(),
        password: await hashPassword(newPassword),
      },
    })
    return null
  }
}

export default changeUserPassword
