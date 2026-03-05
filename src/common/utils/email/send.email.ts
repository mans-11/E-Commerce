import { BadRequestException } from "@nestjs/common";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendEmail = async (
  data: Mail.Options,
): Promise<SMTPTransport.SentMessageInfo> => {
  if (!data.html && !data.attachments?.length && !data.text) {
    throw new BadRequestException("Missing Email content");
  }

  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      ...data,
      from: `"HEX" <${process.env.EMAIL}>`,
    });

    console.log("Message Sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw error;
  }
};
