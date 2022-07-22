import { NextFunction, Request, Response } from 'express';
import catchAsyncErrors from '../middleware/catchAsyncErrors';
import ServiceModel, { Service } from '../models/serviceModel';
import UserModel, { Roles, UserObj } from '../models/userModel';
import ErrorHander from '../utils/errorHandler';

interface CustomRequest<T> extends Request {
  body: T;
  user?: UserObj;
}

interface AdminBody {
  username: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export const createAdmin = catchAsyncErrors(
  async (req: CustomRequest<AdminBody>, res: Response, next: NextFunction) => {
    const user = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      username: req.body.username,
      phoneNo: req.body.phone,
      role: Roles.ADMIN,
      password: req.body.password,
    });

    try {
      await user.save();
      return res.status(201).json({
        success: true,
        messages: 'New Admin added to database',
      });
    } catch (error) {
      return next(new ErrorHander(error as string, 409));
    }
  }
);

export const createService = catchAsyncErrors(
  async (req: CustomRequest<Service>, res: Response, next: NextFunction) => {
    req.body.name = req.body.name.toLowerCase();
    const services = await ServiceModel.find({ name: req.body.name });

    if (services.length > 0) {
      return next(new ErrorHander('Service is already present', 400));
    }

    const service = new ServiceModel({
      ...req.body,
    });

    try {
      await service.save();
      return res.status(201).json({
        success: true,
        messages: 'New Service added to database',
      });
    } catch (error) {
      return next(new ErrorHander(error as string, 409));
    }
  }
);

export const getProfessionals = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const professionals = await UserModel.find({ role: Roles.PROFESSIONAL });
    return res.json({ success: true, professionals });
  }
);

export const getUsers = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const users = await UserModel.find({ role: Roles.USER });
    return res.json({ success: true, users });
  }
);

export const getAdmins = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const admins = await UserModel.find({ role: Roles.ADMIN });
    return res.json({ success: true, admins });
  }
);

export const getAdmin = catchAsyncErrors(
  async (req: CustomRequest<void>, res: Response) =>
    res.json({ success: true, admin: req.user })
);
