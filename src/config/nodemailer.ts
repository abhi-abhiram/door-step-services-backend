import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

async function sendMail(message: string, to: string) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: 'Order placed',
    html: message,
  });

  transporter.sendMail(info, (error) => {
    if (error) {
      console.log(error);
    }
  });
}

export default sendMail;
