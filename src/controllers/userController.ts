import { NextFunction, Request, Response } from 'express';
import Stripe from 'stripe';
import createStripeObj from '../utils/stripe';
import catchAsyncErrors from '../middleware/catchAsyncErrors';
import UserModel from '../models/userModel';
import ErrorHander from '../utils/errorHandler';
import OrderModel, { OrderStatus } from '../models/orderModel';
import serviceModel from '../models/serviceModel';

interface CustomRequest<Body> extends Request {
  body: Body;
}

interface Body {
  customerEmail: string;
  serviceId: string;
}

const createCheckout = catchAsyncErrors(
  async (req: CustomRequest<Body>, res: Response, next: NextFunction) => {
    const stripe = createStripeObj();
    const Domain = process.env.CLIENT_DOMAIN;
    const { customerEmail, serviceId } = req.body;
    const service = await serviceModel.findById(serviceId);
    const LineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
      name: service.name,
      description: service.description,
      quantity: 1,
      currency: 'usd',
      amount: service.price,
    };

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [LineItem],
        mode: 'payment',
        success_url: `${Domain}/success.html`,
        cancel_url: `${Domain}/cancel.html`,
        customer_email: customerEmail,
        metadata: { serviceId },
      });
      return res.status(303).send(session.url as string);
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
        serviceId: string;
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
      const user = await UserModel.findOne({
        email: event.data.object.customer_email,
      });

      const order = new OrderModel({
        service: event.data.object.metadata?.serviceId,
        user: user?.id,
        paymentInfo: {
          id: event.data.object.payment_intent,
          status: event.data.object.status,
        },
        paidAt: Date.now(),
        totalPrice: event.data.object.amount_total,
        orderStatus: OrderStatus.ARRIVING,
      });

      try {
        await order.save();
      } catch (error) {
        console.log(error);
      }
    }

    return res.json({ received: true });
  }
);

export default createCheckout;
