import { useState } from "react";
import { toast } from "react-toastify";

import {
  IRegisterInput,
  ILoginInput
} from "@/src/modules/auth/modal/auth";

import { AuthApiProvider } from "@/src/modules/auth/provider/auth.provider";

import {
  validateRegister,
  validateLogin
} from "@/src/utils/auth.validate";
import { useRouter } from "next/navigation";

export const UseAuthState = () => {

  const [loading, setLoading] =
    useState(false);
const router  = useRouter();
  const [registerData, setRegisterData] =
    useState<IRegisterInput>({
      full_name: "",
      email: "",
      password: "",
    });

  const [loginData, setLoginData] =
    useState<ILoginInput>({
      email: "",
      password: "",
    });

  const handleRegisterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    const validation =
      validateRegister(
        registerData.full_name,
        registerData.email,
        registerData.password
      );
    if (validation) {
      toast.error(validation);
      return;
    }
    setLoading(true);
    AuthApiProvider.apolloInstance.register(
      registerData,

      () => {

        toast.success(
          "User Registered Successfully"
        );
        router.push("/login");

        setRegisterData({
          full_name: "",
          email: "",
          password: "",
        });
        

        setLoading(false);
      },

      (err) => {

        toast.error(
          err?.response?.data?.message ||
          "Registration Failed"
        );

        setLoading(false);
      }
    );
  };

  const handleLoginSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const validation =
      validateLogin(
        loginData.email,
        loginData.password
      );

    if (validation) {
      toast.error(validation);
      return;
    }

    setLoading(true);

    AuthApiProvider.apolloInstance.login(
      loginData,

      (response) => {

        const token =
          response.data.token;

        const user =
          response.data.user;

        localStorage.setItem(
          "token",
          token
        );

        localStorage.setItem(
          "role",
          user.role
        );

        localStorage.setItem(
          "full_name",
          user.full_name
        );

        toast.success(
          "Login Successful"
        );
        router.push("/university-dashboard")

        setLoading(false);
      },

      (err) => {

        toast.error(
          err?.response?.data?.message ||
          "Login Failed"
        );

        setLoading(false);
      }
    );
  };

  return {
    loading,
    registerData,
    loginData,
    handleRegisterChange,
    handleLoginChange,
    handleRegisterSubmit,
    handleLoginSubmit,
  };
};