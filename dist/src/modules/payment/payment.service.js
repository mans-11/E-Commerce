"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = __importDefault(require("stripe"));
let PaymentService = class PaymentService {
    stripe;
    constructor() {
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
    }
    async checkoutSession({ success_url = process.env.SUCCESS_URL, cancel_url = process.env.CANCEL_URL, mode = "payment", discounts = [], metadata = {}, line_items, customer_email, }) {
        const session = await this.stripe.checkout.sessions.create({
            customer_email,
            success_url,
            cancel_url,
            line_items,
            mode,
            discounts,
            metadata,
        });
        return session;
    }
    async createCoupon(data) {
        const coupon = await this.stripe.coupons.create(data);
        return coupon;
    }
    async createPaymentMethod(data) {
        const method = await this.stripe.paymentMethods.create(data);
        return method;
    }
    async createPaymentIntent(data) {
        const paymentIntent = await this.stripe.paymentIntents.create(data);
        return paymentIntent;
    }
    async retrievePaymentIntent(id) {
        const intent = await this.stripe.paymentIntents.retrieve(id);
        return intent;
    }
    async confirmPaymentIntent(id) {
        const intent = await this.retrievePaymentIntent(id);
        if (!intent)
            throw new Error("Invalid Payment Intent ID");
        const confirmIntent = await this.stripe.paymentIntents.confirm(id);
        return confirmIntent;
    }
    async createRefund(id) {
        const intent = await this.retrievePaymentIntent(id);
        if (!intent)
            throw new Error("Invalid Payment Intent ID");
        const refund = await this.stripe.refunds.create({ payment_intent: id });
        return refund;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PaymentService);
//# sourceMappingURL=payment.service.js.map