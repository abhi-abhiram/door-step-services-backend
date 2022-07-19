import { CookieOptions, Response } from 'express';
import { UserObj } from '../models/userModel';

const sendToken = (user: UserObj, statusCode: number, res: Response) => {
  const token = user.getJWTToken();
  const {
    fullName,
    email,
    phoneNo,
    role,
    createdAt,
    address,
    city,
    country,
    pinCode,
    state,
  } = user;

  const options: CookieOptions = {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'none',
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user: {
      fullName,
      email,
      phoneNo,
      role,
      createdAt,
      address,
      city,
      country,
      pinCode,
      state,
    },
    token,
  });
};

export default sendToken;
