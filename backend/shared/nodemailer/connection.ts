import nodemailer from 'nodemailer'

// Create a transporter object using SMTP transport
export const transporter = nodemailer.createTransport({
  service: "Outlook365",
  host: 'smtp.office365.com', // Replace with your SMTP server host
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'plexus.administrator@applexus.com', // Replace with your email
    pass: '' // Replace with your password
  }
});

export let mailOptions = (userEmail: string, fileName: string, ccEmail: string) => {
  console.log('userEmail', userEmail, 'fileName', fileName, 'ccEmail', ccEmail)
  return {
  from: '"Plexus" <plexus.administrator@applexus.com>', // sender address
  to: userEmail, // list of receivers
  cc: ccEmail,
  subject: 'Hello. Here is your report', // Subject line
  text: 'Hello reciepient,', // plain text body
  html: '<b>Hello recipient,</b><br>Here is your requested report.', // html body
  attachments: [
    {
      filename: fileName,
      path: __dirname + `/../../${fileName}`
    }
  ]
}};