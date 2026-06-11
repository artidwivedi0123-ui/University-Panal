import { Register } from "../model/register.model.js";

export const validateRegister = (register:Register) => {

    const  {
        email,
        full_name,
        role,
        password
    } = register;

  switch (true) {

    case !full_name?.trim():
      return "Full Name is required";

      case typeof register.email  !== "string":
         return "Email must be string allowed only"


         case typeof register.password !== "string":
            return "Password must be string";

    case full_name.trim().length < 3:
      return "Full Name must be at least 3 characters";

    case !email:
      return "Email is required";

    case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
      return "Please enter a valid email";

    case !password:
      return "Password is required";

    case Number(password.length) < 6:
      return "Password must be at least 6 characters";

    case Number(password.length) > 20:
      return "Password cannot exceed 20 characters";

    default:
      return null;
  }
};