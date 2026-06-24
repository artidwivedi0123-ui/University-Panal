import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthApiProvider } from "@/src/modules/auth/provider/auth.provider";
import {
  validateRegister,
  validateLogin,
  validateForgetPassword,
} from "@/src/utils/auth.validate";
import { useAuth } from "@/src/context/AuthContext";
import { AUTHROUTES, UNIVERSITYROUTES } from "@/src/constants/routes.contants";
import { AUTHENUM, ROLENUM } from "@/src/constants/enum.constants";
import { IForgotPassword } from "@/src/modules/auth/modal/auth";
export const UseAuthState = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [registerData, setRegisterData] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [resetPassData, setResetPassData] = useState({
      new_password:"",
    confirm_password:""
  });
  const { user, login, logoutUser } = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [forgotpass, setForgetPass] = useState<IForgotPassword>({
    email: "",
  });

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleRegisterSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const validation = validateRegister(
      registerData.full_name,
      registerData.email,
      registerData.password,
    );

    if (validation) {
      toast.error(validation);
      return;
    }
    setLoading(true);
    AuthApiProvider.apolloInstance.register(
      registerData,
      () => {
        toast.success("User Registered Successfully");
        setRegisterData({
          full_name: "",
          email: "",
          password: "",
        });
        router.push(AUTHROUTES.LOGIN);
        setLoading(false);
      },
      (err) => {
        toast.error(err?.response?.data?.message || "Registration Failed");

        setLoading(false);
      },
    );
  };
  const handleLoginSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const validation = validateLogin(loginData.email, loginData.password);

    if (validation) {
      toast.error(validation);
      return;
    }

    setLoading(true);

    AuthApiProvider.apolloInstance.login(
      loginData,
      (response) => {
        const { access_token, refresh_token, user } = response.data;
        Cookies.set(AUTHENUM.ACCESS_TOKEN, access_token);
        Cookies.set(AUTHENUM.REFRESH_TOKEN, refresh_token);
        login(user);
        toast.success(
          user.role === ROLENUM.ADMIN
            ? "Admin Login Successfully"
            : "Student Login Successfully",
        );
        router.push(UNIVERSITYROUTES.UNIVERSITYDASHBOARD);
        setLoading(false);
      },
      (err) => {
        setLoading(false);

        toast.error(err?.response?.data?.message || "Login Failed");
      },
    );
  };

  const logout = useCallback(() => {
    AuthApiProvider.apolloInstance.logout(
      () => {
        toast.success(
          user?.role === ROLENUM.ADMIN
            ? "Admin Logout Successfully"
            : "Student Logout Successfully",
        );
        Cookies.remove(AUTHENUM.ACCESS_TOKEN);
        Cookies.remove(AUTHENUM.REFRESH_TOKEN);
        logoutUser();
        router.replace(AUTHROUTES.LOGIN);
      },
      (err) => {
        toast.error(err?.response?.data?.message || "Logout Failed");
      },
    );
  }, [router, user, logoutUser]);

  const handleForgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForgetPass((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleForgetSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const validate = validateForgetPassword(forgotpass.email);
    if (validate) {
      toast.error(validate);
      return;
    }
    setLoading(true);

    AuthApiProvider.apolloInstance.forgotPassword(
      forgotpass,
      (res) => {
        toast.success("Send Reset Password Link to the Registered Email");
      },
      (err) => {
        toast.error("Error while forgot Password, Something went Wrong");
      },
    );
  };

  const handleResetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setResetPassData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetSubmit = (
    token: string,
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (resetPassData.new_password !== resetPassData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    AuthApiProvider.apolloInstance.resetPassword(
      token,
      {
        new_password: resetPassData.new_password,
        confirm_password:resetPassData.confirm_password,
      },
      (res) => {
        toast.success(res.message);

        setResetPassData({
          new_password: "",
          confirm_password: "",
        });

        router.push(AUTHROUTES.LOGIN);

        setLoading(false);
      },
      (err) => {
        setLoading(false);

        toast.error(
          err?.response?.data?.message || "Error while resetting password",
        );
      },
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
    logout,
    forgotpass,
    handleForgetChange,
    handleForgetSubmit,
    router,
    resetPassData,
    handleResetChange,
    handleResetSubmit,
  };
};
