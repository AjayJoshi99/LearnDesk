const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: `"LearnDesk" <${process.env.GMAIL_USER}>`,
    to,
    subject: 'Your verification code',
    text: `Your verification code is ${otp}. It will expire in ${process.env.OTP_EXPIRE_MIN || 10} minutes.`,
    html: `<p>Your verification code is <b>${otp}</b>. It expires in ${process.env.OTP_EXPIRE_MIN || 10} minutes.</p>`,
  };
  return transporter.sendMail(mailOptions);
};

const sendMail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: `"LearnDesk" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail, sendMail };
