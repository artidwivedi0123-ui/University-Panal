import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthApiProvider } from "@/src/modules/auth/provider/auth.provider";
import { validateRegister, validateLogin } from "@/src/utils/auth.validate";
export const UseAuthState = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [registerData, setRegisterData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
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
  const handleRegisterSubmit = (e: React.FormEvent) => {
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
        router.push("/login");
        setLoading(false);
      },
      (err) => {
        toast.error(err?.response?.data?.message || "Registration Failed");

        setLoading(false);
      },
    );
  };
  const handleLoginSubmit = (e: React.FormEvent) => {
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
        const token = response.data.access_token;
        const rToken = response.data.refresh_token;
        const user = response.data.user;

        Cookies.set("access_token", token, {
          expires: 1, // 1 day
        });
        Cookies.set("refresh_token",rToken);
        toast.success("Login Successful");
        router.push("/university-dashboard");
        setLoading(false);
      },

      (err) => {
        toast.error(err?.response?.data?.message || "Login Failed");
        setLoading(false);
      },
    );
  };

  const logout = useCallback(() => {
    AuthApiProvider.apolloInstance.logout(
      () => {
        Cookies.remove("access_token");
        toast.success("Logout Successful");

        router.replace("/login");
      },

      () => {
        Cookies.remove("access_token");
        localStorage.removeItem("user");

        router.replace("/login");
      },
    );
  }, [router]);

  return {
    loading,
    registerData,
    loginData,
    handleRegisterChange,
    handleLoginChange,
    handleRegisterSubmit,
    handleLoginSubmit,
    logout,
  };
};
