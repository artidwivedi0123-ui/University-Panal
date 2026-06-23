import { Login } from "@src/module/auth/model/login.model.js";

export const validateLogin = (
login:Login
) => {
    const {
        email,
        password
    } = login;

  switch (true) {

    case !email?.trim():
      return "Email is required";

    case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
      return "Please enter a valid email address";

    case !password:
      return "Password is required";

    case password.length < 6:
      return "Password must be at least 6 characters";

    default:
      return null;
  }
};