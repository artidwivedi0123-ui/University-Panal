import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthApiProvider } from "@/src/modules/auth/provider/auth.provider";
import { validateRegister, validateLogin } from "@/src/utils/auth.validate";
import { useAuth } from "@/src/context/AuthContext";
export const UseAuthState = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [registerData, setRegisterData] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const {user,login,logoutUser} = useAuth();
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

  const validation = validateLogin(
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
      const {
        access_token,
        refresh_token,
        user,
      } = response.data;
      Cookies.set("access_token", access_token);
      Cookies.set("refresh_token", refresh_token);
      login(user);
      toast.success(
        user.role === "admin"
          ? "Admin Login Successfully"
          : "Student Login Successfully"
      );
      router.push("/university-dashboard");
      setLoading(false);
    },
    (err) => {
      setLoading(false);

      toast.error(
        err?.response?.data?.message ||
          "Login Failed"
      );
    }
  );
};

  const logout = useCallback(() => {
  AuthApiProvider.apolloInstance.logout(
    () => {
      toast.success(
        user?.role === "admin"
          ? "Admin Logout Successfully"
          : "Student Logout Successfully"
      );
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      logoutUser();
      router.replace("/login");
    },
    (err) => {
      toast.error(
        err?.response?.data?.message ||
          "Logout Failed"
      );
    }
  );
}, [router, user, logoutUser]);



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
