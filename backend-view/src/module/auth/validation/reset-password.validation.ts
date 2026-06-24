import { ResetPassword } from "@src/module/universityPanel/models/reset-password.model.js";

export const validateResetPassword = (
  data: ResetPassword
): string | null => {

  if (!data.new_password || !data.confirm_password) {
    return "Both password fields are required";
  }

  if (data.new_password.length < 6) {
    return "Password must be at least 6 characters";
  }

  if (data.new_password !== data.confirm_password) {
    return "Passwords do not match";
  }

  return null;
};