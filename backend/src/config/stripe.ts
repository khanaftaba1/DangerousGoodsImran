import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn('STRIPE_SECRET_KEY not configured. Stripe features will be unavailable.');
}

const stripeClient = new Stripe(stripeSecretKey || '', {
  apiVersion: '2026-03-25.dahlia',
});

export { stripeClient as stripe };
