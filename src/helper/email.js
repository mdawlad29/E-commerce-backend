const nodemailer = require("nodemailer");
const { smtpUsername, smtpPassword } = require("../secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: smtpUsername, // generated ethereal user
    pass: smtpPassword, // generated ethereal password
  },
});

const emailWithNodemailer = async (emailData) => {
  try {
    const mailOptions = {
      from: smtpUsername, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent:", info.response);
  } catch (error) {
    console.log("Error occured while sending email: ", error);
    throw error;
  }
};

module.exports = emailWithNodemailer;
