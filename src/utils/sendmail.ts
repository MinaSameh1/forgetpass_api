import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import logger from './logger'

export async function sendmail(email: string, url: string) {
  const transporter = nodemailer.createTransport(
    new SMTPTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env['GMAIL'],
        pass: process.env['GMAIL_PASS'],
      },
    })
  )

  const mailOptions = {
    from: process.env['GMAIL'],
    to: email,
    subject: 'Reset Password',
    text: `You Requested to reset password, the following link will reset it \n ${url}`,
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err
    logger.info(`Mail send. ${info}`)
  })
}
