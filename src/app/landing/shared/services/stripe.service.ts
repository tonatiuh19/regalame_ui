import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe(
      'pk_test_51OtL2vI0AVtzugqlUy24sYbVY170Lw8T6SFaQxpJYqiLRoxs90HRumG2XT9uvuu9ao3zDZ0gGbzUCbdlCoJ0qJlN00gnAE96oj'
    );
  }

  async getStripe() {
    return await this.stripePromise;
  }
}
