"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailEvent = void 0;
const node_events_1 = require("node:events");
const user_enum_1 = require("../../enums/user.enum");
const send_email_1 = require("../email/send.email");
const verify_email_template_1 = require("../email/verify.email.template");
exports.emailEvent = new node_events_1.EventEmitter();
exports.emailEvent.on("confirm-email", async (data) => {
    try {
        data.subject = user_enum_1.OTPEnum.EMAIL_VERIFICATION;
        data.html = (0, verify_email_template_1.template)(data.otp, data.username, data.subject);
        await (0, send_email_1.sendEmail)(data);
    }
    catch (error) {
        console.log("Fail To Send Email", error);
    }
});
//# sourceMappingURL=email.events.js.map