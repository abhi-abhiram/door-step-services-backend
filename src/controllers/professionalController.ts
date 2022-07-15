import { Request, Response, NextFunction } from 'express';
import catchAsyncErrors from '../middleware/catchAsyncErrors';
import UserModel, { Roles, UserObj } from '../models/userModel';
import ErrorHander from '../utils/errorHandler';
import sendToken from '../utils/jwtToken';

interface CustomRequest<T> extends Request {
  user?: UserObj | null;
  body: T;
}

export const getProfessional = catchAsyncErrors(
  async (req: CustomRequest<void>, res: Response) => {
    const { user } = req;
    return res.json({ success: true, professional: user });
  }
);

interface ProfessionalBody {
  username: string;
  fullName: string;
  email: string;
  serviceName: string;
  location: string;
  phone: string;
  password: string;
}

export const createProfessional = catchAsyncErrors(
  async (
    req: CustomRequest<ProfessionalBody>,
    res: Response,
    next: NextFunction
  ) => {
    console.log(req.body);
    const user = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      username: req.body.username,
      location: req.body.location,
      phoneNo: req.body.phone,
      role: Roles.PROFESSIONAL,
      serviceName: req.body.serviceName.toLowerCase(),
      password: req.body.password,
    });

    try {
      await user.save();
      return sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHander(error as string, 409));
    }
  }
);

interface EditProfessionalBody {
  username: string;
  fullName: string;
  email: string;
  serviceName: string;
  location: string;
  phone: string;
}

export const editProfessional = catchAsyncErrors(
  async (
    req: CustomRequest<EditProfessionalBody>,
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
      user.serviceName = req.body.serviceName;
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
