import { NextFunction, Request, Response } from 'express';
import catchAsyncErrors from '../middleware/catchAsyncErrors';
import OrderModel, { OrderStatus } from '../models/orderModel';
import ServiceModel, { Service } from '../models/serviceModel';
import UserModel, { Roles, UserObj } from '../models/userModel';
import ErrorHander from '../utils/errorHandler';

interface CustomRequest<T> extends Request {
  body: T;
}

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
      return res.status(201).json({
        success: true,
        messages: 'New Professional added to database',
      });
    } catch (error) {
      return next(new ErrorHander(error as string, 409));
    }
  }
);

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

interface PendingOrderReq extends Request {
  user?: UserObj;
}

export const getPendingOrders = catchAsyncErrors(
  async (req: PendingOrderReq, res: Response) => {
    const orders = await OrderModel.find({ orderStatus: OrderStatus.ARRIVING });
    return res.json({ success: true, orders });
  }
);

export default createProfessional;
