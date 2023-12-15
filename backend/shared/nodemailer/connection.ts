import nodemailer from 'nodemailer'

// Create a transporter object using SMTP transport
export const transporter = nodemailer.createTransport({
  service: "Outlook365",
  host: 'smtp.office365.com', // Replace with your SMTP server host
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'sidarth157@gmail.com', // Replace with your email
    pass: 'gltdyhncrykihgui' // Replace with your password
  }
});

export let mailOptions = (userEmail: string) => {return {
  from: '"Sidarth G" <sidarth157@gmail.com>', // sender address
  to: userEmail, // list of receivers
  subject: 'Hello. Here is your report', // Subject line
  text: 'Hello user', // plain text body
  html: '<b>Hello User</b>', // html body
  attachments: [
    {
      filename: 'CustomName.xlsx',
      path: __dirname + '/../../CustomName.xlsx'
    }
  ]
}};