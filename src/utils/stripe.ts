import Stripe from 'stripe';

const createStripeObj = () =>
  new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2020-08-27',
  });

export default createStripeObj;
