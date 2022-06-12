import { NextFunction, Request, Response } from 'express';
import catchAsyncErrors from '../middleware/catchAsyncErrors';
import UserModel, { Roles, UserObj } from '../models/userModel';
import ErrorHander from '../utils/errorHandler';

interface CustomRequest<Body> extends Request {
  body: Body;
  user?: UserObj;
}

interface Body {
  email: string;
  forceConvert?: boolean;
}

const makeProfessional = catchAsyncErrors(
  async (req: CustomRequest<Body>, res: Response, next: NextFunction) => {
    const { email, forceConvert } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && (user.role !== Roles.ADMIN || forceConvert)) {
      user.role = Roles.PROFESSIONAL;
      await user.save();
      return res.status(201).json({
        success: true,
        message: 'Successfully converted to professional',
      });
    }

    if (user?.role === Roles.ADMIN) {
      return next(
        new ErrorHander(
          'Give forceConvert as true to convert from admin to professional',
          400
        )
      );
    }
    return next(new ErrorHander('User not found', 400));
  }
);

export default makeProfessional;
