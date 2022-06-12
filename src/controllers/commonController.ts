import { NextFunction, Request, Response } from 'express';
import catchAsyncErrors from '../middleware/catchAsyncErrors';
import UserModel, { UserObj } from '../models/userModel';
import ErrorHander from '../utils/errorHandler';
import sendToken from '../utils/jwtToken';

export const logout = catchAsyncErrors((req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  return res.status(200).json({
    success: true,
    message: 'Logged Out',
  });
});

interface ClientCredentials {
  email: string;
  password: string;
}

interface CustomRequest<Body> extends Request {
  body: Body;
}

export const loginClient = catchAsyncErrors(
  async (
    req: CustomRequest<ClientCredentials>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHander('Please Enter Email & Password', 400));
    }

    const client = await UserModel.findOne({ email }).select('+password');

    if (!client) {
      return next(new ErrorHander('Invalid email or password', 401));
    }

    const isPasswordMatched = await client?.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHander('Invalid email or password', 401));
    }

    return sendToken(client, 200, res);
  }
);

interface Register {
  name: string;
  email: string;
  password: string;
  phoneNo: string;
}

export const registerClient = catchAsyncErrors(
  async (req: CustomRequest<Register>, res: Response, next: NextFunction) => {
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      password: req.body.password,
    });

    try {
      const userData = await user.save();
      return sendToken(userData, 201, res);
    } catch (error) {
      return next(new ErrorHander(error as string, 409));
    }
  }
);

interface AddAddressRequest<Body> extends Request {
  body: Body;
  user?: UserObj;
}

interface AddressBody {
  address: string;
  state: string;
  city: string;
  country: string;
  pinCode: number;
}

export const addAddress = catchAsyncErrors(
  async (
    req: AddAddressRequest<AddressBody>,
    res: Response,
    next: NextFunction
  ) => {
    const user = await UserModel.findById(req.user?.id);

    if (user) {
      user.address = req.body.address;
      user.state = req.body.state;
      user.city = req.body.city;
      user.country = req.body.country;
      user.pinCode = req.body.pinCode;
    }

    try {
      await user?.save();
      return res.json({
        success: true,
        message: 'Successfully added the address',
      });
    } catch (error) {
      return next(new ErrorHander(error as string, 409));
    }
  }
);
