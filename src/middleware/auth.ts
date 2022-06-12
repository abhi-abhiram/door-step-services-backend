import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import ErrorHander from '../utils/errorHandler';
import catchAsyncErrors from './catchAsyncErrors';
import userModel, { Roles, UserObj } from '../models/userModel';

interface CustomRequest extends Request {
  cookies: { token: string };
  user?: UserObj | null;
}

export const isAuthenticatedUser = catchAsyncErrors(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) {
      return next(new ErrorHander('Please Login to access this resource', 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = await userModel.findById((decodedData as { id: string }).id);

    return next();
  }
);

export const authorizeRoles =
  (roles: Roles) => (req: CustomRequest, res: Response, next: NextFunction) => {
    if (roles !== req.user?.role) {
      return next(
        new ErrorHander(
          `Role: ${req.user?.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    return next();
  };
