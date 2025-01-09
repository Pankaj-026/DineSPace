const nodemailer = require("nodemailer");

module.exports = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: process.env.service,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSKEY,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: "Sub",
      text: "textt",
    });

    console.log("Sent mail")
  } catch (error) {
    console.log(error);
  }
};
