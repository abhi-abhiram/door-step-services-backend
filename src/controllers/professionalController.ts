import { Request, Response } from 'express';
import catchAsyncErrors from '../middleware/catchAsyncErrors';
import { UserObj } from '../models/userModel';
import ServiceModel from '../models/serviceModel';

interface CustomRequest<Body> extends Request {
  body: Body;
  user?: UserObj;
}

interface ServiceBody {
  name: string;
  price: number;
  location: string;
  description: string;
}

const createService = catchAsyncErrors(
  async (req: CustomRequest<ServiceBody>, res: Response) => {
    const { name, price, location, description } = req.body;
    const service = new ServiceModel({
      name,
      price,
      location,
      description,
      professional: req.user?.id,
    });
    await service.save();
    return res.status(201).json({ success: true, service });
  }
);

export default createService;
