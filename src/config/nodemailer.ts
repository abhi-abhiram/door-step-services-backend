import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: parseInt(process.env.PORTEMAIL as string, 10),
  secure: false,
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
    text: message,
  });

  transporter.sendMail(info, (error) => {
    if (error) {
      console.log(error);
    }
  });
}

export default sendMail;
