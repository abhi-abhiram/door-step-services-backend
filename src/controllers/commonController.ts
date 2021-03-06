import { NextFunction, Request, Response } from 'express';
import Stripe from 'stripe';
import catchAsyncErrors from '../middleware/catchAsyncErrors';
import UserModel from '../models/userModel';
import ErrorHander from '../utils/errorHandler';
import sendToken from '../utils/jwtToken';
import createStripeObj from '../utils/stripe';
import serviceModel from '../models/serviceModel';
import OrderModel, { OrderStatus, PaymentStatus } from '../models/orderModel';
import sendMail from '../config/nodemailer';

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

interface UserBody {
  username: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export const registerClient = catchAsyncErrors(
  async (req: CustomRequest<UserBody>, res: Response, next: NextFunction) => {
    const user = new UserModel({
      fullName: req.body.fullName,
      username: req.body.username,
      email: req.body.email,
      phoneNo: req.body.phone,
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

interface CheckoutBody {
  fullName: string;
  email: string;
  phoneNumber: string;
  serviceDate: string;
  address: string;
  city: string;
  note: string;
  serviceName: string;
  serviceDesc: string;
}

export const createCheckout = catchAsyncErrors(
  async (
    req: CustomRequest<CheckoutBody>,
    res: Response,
    next: NextFunction
  ) => {
    const stripe = createStripeObj();
    const Domain = process.env.CLIENT_DOMAIN;

    const service = await serviceModel.findOne({
      name: req.body.serviceName.toLowerCase(),
    });

    if (service?.id === undefined) {
      return next(new ErrorHander('Requested Service is not avaliable', 400));
    }

    const LineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
      name: service?.name,
      quantity: 1,
      currency: 'inr',
      amount: service?.price,
    };

    try {
      const order = new OrderModel({
        ...req.body,
        paymentInfo: {
          id: 'NONE',
          status: PaymentStatus.PENDING,
        },
        totalPrice: service.price,
        orderStatus: OrderStatus.PROCESSING,
        serviceId: service.id,
      });

      await order.save();

      const session = await stripe.checkout.sessions.create({
        line_items: [LineItem],
        mode: 'payment',
        success_url: `${Domain}/success.html`,
        cancel_url: `${Domain}/cancel.html`,
        customer_email: req.body.email,
        metadata: {
          orderId: order.id,
        },
      });

      return res.json({ success: true, url: session.url as string });
    } catch (error) {
      return next(new ErrorHander((error as { message: string }).message, 400));
    }
  }
);

interface OrderRequest extends Request {
  rawBody?: Buffer;
}

interface Event extends Stripe.Event {
  data: {
    object: {
      payment_intent?: string;
      status?: string;
      amount_total?: number;
      customer_email?: string;
      metadata?: {
        orderId: string;
      };
    };
  };
}

export const createOrder = catchAsyncErrors(
  async (req: OrderRequest, res: Response) => {
    const stripe = createStripeObj();
    const sig = req.headers['stripe-signature'] as string;

    let event: Event;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
    try {
      if (req.rawBody)
        event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
      else return null;
    } catch (error) {
      return res
        .status(400)
        .send(`Webhook Error: ${(error as { message: string }).message}`);
    }
    if (event.type === 'checkout.session.completed') {
      const order = await OrderModel.findById(
        event.data.object.metadata?.orderId
      );
      if (order) {
        order.paymentInfo.id = event.id;
        order.paymentInfo.status = PaymentStatus.COMPLETED;
        order.orderStatus = OrderStatus.ARRIVING;
      } else {
        return null;
      }
      try {
        await order?.save();
        if (order?.email) {
          const professionals = await UserModel.find({
            location: order?.city,
          });
          professionals.forEach(async (value) => {
            await sendMail(
              `<h2>Order has placed by user ${order?.fullName}</h2> \n  
              <ul>
               <li>City: ${order?.city}</li>
               <li>Address: ${order?.address}</li>
               <li>Email: ${order?.email}</li>
               <li>Phone: ${order?.phoneNumber}</li>
               <li>Order Date: ${order?.serviceDate}</li>
               <li>Note: ${order?.note}</li>
               <li>Service Description: ${order?.serviceDesc}</li>
              </ul>
          `,
              value?.email as string
            ).catch((error) => console.log(error));
          });
        }
      } catch (error) {
        throw new ErrorHander((error as { message: string }).message, 400);
      }
    }

    return res.json({ received: true });
  }
);
