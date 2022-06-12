import { CookieOptions, Response } from 'express';
import { UserObj } from '../models/userModel';

const sendToken = (user: UserObj, statusCode: number, res: Response) => {
  const token = user.getJWTToken();

  const options: CookieOptions = {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
