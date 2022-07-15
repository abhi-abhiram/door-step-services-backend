import { NextFunction, Request, Response } from 'express';
import catchAsyncErrors from '../middleware/catchAsyncErrors';
import UserModel, { Roles, UserObj } from '../models/userModel';
import ErrorHander from '../utils/errorHandler';

interface CustomRequest<T> extends Request {
  body: T;
  user?: UserObj | null;
}

export const getUser = catchAsyncErrors(
  async (req: CustomRequest<void>, res: Response) => {
    const { user } = req;
    return res.json({ success: true, user });
  }
);

interface EditUserBody {
  username: string;
  fullName: string;
  email: string;
  location: string;
  phone: string;
}

export const editUser = catchAsyncErrors(
  async (
    req: CustomRequest<EditUserBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { user } = req;

    if (user) {
      user.fullName = req.body.fullName;
      user.email = req.body.email;
      user.username = req.body.username;
      user.location = req.body.location;
      user.phoneNo = req.body.phone;
    }
    try {
      await user?.save();
      return res.status(201).json({
        success: true,
        messages: 'Success',
      });
    } catch (error) {
      return next(new ErrorHander(error as string, 409));
    }
  }
);
