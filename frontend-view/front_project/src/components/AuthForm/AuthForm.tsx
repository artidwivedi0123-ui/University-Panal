import {
  AUTH_SECTION_PAGE,
  AUTH_SECTION_TYPE,
} from "@/src/types/auth-section.type";
import style from "@/src/components/AuthForm/authForm.module.scss";
import Input from "../Input/Input";
interface AuthFormProps {
  type: AUTH_SECTION_PAGE;
  formData: any;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export default function AuthForm({
  formData,
  loading,
  onChange,
  onSubmit,
  type,
}: AuthFormProps) {
  const isLogin = type === AUTH_SECTION_TYPE.LOGIN;
  const isRegister = type === AUTH_SECTION_TYPE.REGISTER;
  return (
    <>
    <h2 className={style["heading"]}>{isRegister && "Register"}{isLogin && "Login"}</h2>
  <form
  className={style["container"]}
  onSubmit={onSubmit}
>
    
  {isRegister && (
    <div className={style["field"]}>
    <label className={style["label"]}>Full Name</label>
    <Input
      name="full_name"
      onChange={onChange}
      type="text"
      value={formData.full_name}
      placeholder="Full Name"
      classname={style["input"]}
    />
    </div>
  )}
<label className={style["label"]}>Email</label>
  <Input
    name="email"
    onChange={onChange}
    type="email"
    value={formData.email}
    placeholder="Email"
    classname={style["input"]}
  />
<label className={style["label"]}>Password</label>
  <Input
    name="password"
    onChange={onChange}
    type="password"
    value={formData.password}
    placeholder="Password"
    classname={style["input"]}
  />
  <button
    type="submit"
    disabled={loading}
    className={style["form-button"]}
  >
    {loading
      ? "Please wait..."
      : isLogin
      ? "Login"
      : "Register"}
  </button>

</form>
    </>
  );
}
