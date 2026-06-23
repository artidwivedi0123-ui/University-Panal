import { transporter } from "@src/config/mailtrap.config.js";

export const sendMail = async (
  to: string,
  subject: string,
  html: string
) => {
  await transporter.sendMail({
    from: 'from: "no-reply@mailtrap.io",',
    to,
    subject,
    html,
  });
};