const bcrypt = require('bcrypt')

const saltRounds = 10

export const hashPassword = async (plainText: string): Promise<string> => {
  const hash = await bcrypt.hash(plainText, saltRounds)
  return hash
}

export const comparePassword = async (
  plainText: string,
  hashedText: string
): Promise<boolean> => {
  const matches = await bcrypt.compare(plainText, hashedText)
  return matches
}
