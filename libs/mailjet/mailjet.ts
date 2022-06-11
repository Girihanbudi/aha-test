import ErrorCode from '@common/error-code'
import MailjetError from './mailjet-error'

export interface MailJetEmail {
  Email: string
  Name?: string
}

export const defaultMailJetEmailSender: MailJetEmail = {
  Email: process.env.MAILJET_SENDER_MAIL!,
  Name: process.env.MAILJET_SENDER_NAME!,
}

const mailJetsend = async (
  recipients: MailJetEmail[],
  subject: string,
  htmlBody: string,
  sender: MailJetEmail = defaultMailJetEmailSender
): Promise<ErrorCode | null> => {
  const mailjet = await require('node-mailjet').connect(
    process.env.MAILJET_API!,
    process.env.MAILJET_SECRET!
  )
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: sender,
        To: recipients,
        Subject: subject,
        HTMLPart: htmlBody,
      },
    ],
  })

  let error: MailjetError | null = null

  await request
    .then(() => {
      error = null
    })
    .catch((err: any) => {
      if (err.statusCode === 400) error = MailjetError.MAILJET_RES_400
      if (err.statusCode === 401) error = MailjetError.MAILJET_RES_401
    })

  return error
}

export default mailJetsend
