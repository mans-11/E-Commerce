"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
const generateOtp = () => {
    return String(Math.floor(Math.random() * (90000 - 100000) + 100000));
};
exports.generateOtp = generateOtp;
//# sourceMappingURL=otp.utils.js.map