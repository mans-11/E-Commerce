import Stripe from "stripe";
export declare class PaymentService {
    private stripe;
    constructor();
    checkoutSession({ success_url, cancel_url, mode, discounts, metadata, line_items, customer_email, }: Stripe.Checkout.SessionCreateParams): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    createCoupon(data: Stripe.CouponCreateParams): Promise<Stripe.Response<Stripe.Coupon>>;
    createPaymentMethod(data: Stripe.PaymentMethodCreateParams): Promise<Stripe.Response<Stripe.PaymentMethod>>;
    createPaymentIntent(data: Stripe.PaymentIntentCreateParams): Promise<Stripe.Response<Stripe.PaymentIntent>>;
    retrievePaymentIntent(id: string): Promise<Stripe.Response<Stripe.PaymentIntent>>;
    confirmPaymentIntent(id: string): Promise<Stripe.Response<Stripe.PaymentIntent>>;
    createRefund(id: string): Promise<Stripe.Response<Stripe.Refund>>;
}
