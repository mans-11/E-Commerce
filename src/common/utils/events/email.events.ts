import { EventEmitter } from "node:events";
import { OTPEnum } from "src/common/enums/user.enum";
import { sendEmail } from "../email/send.email";
import { template } from "../email/verify.email.template";

export const emailEvent = new EventEmitter();

emailEvent.on("confirm-email", async (data) => {
  try {
    data.subject = OTPEnum.EMAIL_VERIFICATION;
    data.html = template(data.otp, data.username, data.subject);

    await sendEmail(data);
  } catch (error) {
    console.log("Fail To Send Email", error);
  }
});
