const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail app password
      },
    });

    // Email options
    const mailOptions = {
      from: `"DineSPace" <${process.env.EMAIL_USER}>`, // Sender name and email
      to, // Recipient's email
      subject, // Subject line
      text, // Plain text body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}:`, info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
