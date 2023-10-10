import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "khypnvipwphv2qne@ethereal.email",
    pass: "qU3Cjk16ReNhfG5UrS",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string) {
  // send mail with defined transport object

  //   let testAcc = await nodemailer.createTestAccount();

  //   console.log(testAcc);

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to, // list of receivers
    subject: "Hello ✔", // Subject line
    html, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
