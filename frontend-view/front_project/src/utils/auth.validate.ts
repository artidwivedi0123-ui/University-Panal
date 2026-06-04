export const validateRegister = (
  full_name: string,
  email: string,
  password: string
) => {

  if (!full_name.trim()) {
    return "Full Name is required";
  }

  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Invalid Email";
  }

  if (!password.trim()) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
};

export const validateLogin = (
  email: string,
  password: string
) => {

  if (!email.trim()) {
    return "Email is required";
  }

  if (!password.trim()) {
    return "Password is required";
  }

  return null;
};