import { NextFunction, Request, Response } from 'express';
import catchAsyncErrors from '../middleware/catchAsyncErrors';
import { UserObj } from '../models/userModel';
import OrderModel, { OrderStatus } from '../models/orderModel';
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

export const getPendingOrders = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const orders = await OrderModel.find({ orderStatus: OrderStatus.ARRIVING });
    return res.json({ success: true, orders });
  }
);

export const makeOrderComplete = catchAsyncErrors(
  async (
    req: CustomRequest<{ orderId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const order = await OrderModel.findById(req.body.orderId);

    if (order) {
      order.orderStatus = OrderStatus.DELIVERED;
    } else return next(new ErrorHander('Order not found', 400));
    await order.save();
    return res.status(201).json({ success: true, message: 'Success' });
  }
);
