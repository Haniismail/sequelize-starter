const nodemailer = require("nodemailer");

const sendEmail = async (options: any) => {
  //transporter service
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //the email options
  const mailOptions = {
    from: `${process.env.EMAIL_USERNAME}`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  transporter.sendMail(mailOptions, (err: any, res: Response) => {});
  //call the send email function
  // await transporter.sendEmail(mailOptions);
};
module.exports = sendEmail;
