"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPEnum = exports.GenderEnum = exports.ProviderEnum = void 0;
var ProviderEnum;
(function (ProviderEnum) {
    ProviderEnum["SYSTEM"] = "SYSTEM";
    ProviderEnum["GOOGLE"] = "GOOGLE";
})(ProviderEnum || (exports.ProviderEnum = ProviderEnum = {}));
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["MALE"] = "MALE";
    GenderEnum["FEMALE"] = "FEMALE";
})(GenderEnum || (exports.GenderEnum = GenderEnum = {}));
var OTPEnum;
(function (OTPEnum) {
    OTPEnum["EMAIL_VERIFICATION"] = "Email Verification";
    OTPEnum["PASSWORD_RESET"] = "Password Reset";
    OTPEnum["TWO_STEP_VERIFICATION"] = "Two Step ";
})(OTPEnum || (exports.OTPEnum = OTPEnum = {}));
//# sourceMappingURL=user.enum.js.map