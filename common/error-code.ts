// Error Formatting Template for app
export interface ErrorCode {
  key: string // this used for error naming code
  errorEn: string // this is the error message in english
  code: number // this is error code for http response code
}

// Get all error key and message into object for translation
export function getTranslation(object: any, translation: string = 'En'): {} {
  const objs: { [key: string]: any } = {}
  Object.entries(object).forEach(([key, value]) => {
    const val = value as ErrorCode
    const keyName = `error${translation}` as keyof ErrorCode

    objs[key] = val[keyName]
  })
  return objs
}

// Default error
export class DefaultError implements ErrorCode {
  static readonly DEFAULT_EML_001 = new DefaultError(
    'DEFAULT_EML_001',
    'Email is invalid',
    400
  )

  static readonly DEFAULT_FED_001 = new DefaultError(
    'DEFAULT_FED_001',
    'Field cannot be empty',
    400
  )

  static readonly DEFAULT_SYS_500 = new DefaultError(
    'DEFAULT_SYS_500',
    'Internal Server Error',
    500
  )

  static readonly DEFAULT_SCM_001 = new DefaultError(
    'DEFAULT_SCM_001',
    'Bad schema request',
    400
  )

  // private to disallow creating other instances of this type
  private constructor(
    public readonly key: string,
    public readonly errorEn: string,
    public readonly code: number
  ) {}
}

export default ErrorCode
