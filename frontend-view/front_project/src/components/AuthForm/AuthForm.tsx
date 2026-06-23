"use client";
import {
  AUTH_SECTION_PAGE,
  AUTH_SECTION_TYPE,
} from "@/src/types/auth-section.type";
import style from "@/src/components/AuthForm/authForm.module.scss";
import Input from "../Input/Input";
import { useTranslations } from "next-intl";
import { TRANSLATIONSAPPCONSTANTS } from "@/src/constants/translationConstants";
interface AuthFormProps {
  type: AUTH_SECTION_PAGE;
  formData: any;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  renderLinks?: React.ReactNode;
}
export default function AuthForm({
  formData,
  loading,
  onChange,
  onSubmit,
  type,
  renderLinks
}: AuthFormProps) {
  const isLogin = type === AUTH_SECTION_TYPE.LOGIN;
  const isRegister = type === AUTH_SECTION_TYPE.REGISTER;
  const isForgetPass = type === AUTH_SECTION_TYPE.FORGET_PASSWORD;
  const isResetPassword = type === AUTH_SECTION_TYPE.RESET_PASSWORD;
  const authTrans = useTranslations(TRANSLATIONSAPPCONSTANTS.AUTH);
  return (
    <>
      <h2 className={style["heading"]}>
        {isRegister && authTrans(TRANSLATIONSAPPCONSTANTS.REGISTER)}
        {isLogin && authTrans(TRANSLATIONSAPPCONSTANTS.LOGIN)}
        {isForgetPass && authTrans(TRANSLATIONSAPPCONSTANTS.FORGETPASS)}
        {isResetPassword && authTrans(TRANSLATIONSAPPCONSTANTS.RESETPASSWORD)}
      </h2>
      <form className={style["container"]} onSubmit={onSubmit}>
        {isRegister  && (
          <>
            <label className={style["label"]}>
              {authTrans(TRANSLATIONSAPPCONSTANTS.FULLNAME)}
            </label>
            <Input
              name="full_name"
              onChange={onChange}
              type="text"
              value={formData.full_name}
              placeholder={authTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERFN)}
              classname={style["input"]}
            />
             <label className={style["label"]}>
          {authTrans(TRANSLATIONSAPPCONSTANTS.EMAIL)}
        </label>
        <Input
          name="email"
          onChange={onChange}
          type="email"
          value={formData.email}
          placeholder={authTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDEREM)}
          classname={style["input"]}
        />
        <label className={style["label"]}>
          {authTrans(TRANSLATIONSAPPCONSTANTS.PASSWORD)}
        </label>
        <Input
          name="password"
          onChange={onChange}
          type="password"
          value={formData.password}
          placeholder={authTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERPS)}
          classname={style["input"]}
        />
          </>
        )}
        {isLogin && (
          <>
            <label className={style["label"]}>
          {authTrans(TRANSLATIONSAPPCONSTANTS.EMAIL)}
        </label>
        <Input
          name="email"
          onChange={onChange}
          type="email"
          value={formData.email}
          placeholder={authTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDEREM)}
          classname={style["input"]}
        />
        <label className={style["label"]}>
          {authTrans(TRANSLATIONSAPPCONSTANTS.PASSWORD)}
        </label>
        <Input
          name="password"
          onChange={onChange}
          type="password"
          value={formData.password}
          placeholder={authTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERPS)}
          classname={style["input"]}
        /></>
        )}
        {isForgetPass && (
          <>
            <label className={style["label"]}>
          {authTrans(TRANSLATIONSAPPCONSTANTS.EMAIL)}
        </label>
        <Input
          name="email"
          onChange={onChange}
          type="email"
          value={formData.email}
          placeholder={authTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDEREM)}
          classname={style["input"]}
        /></>
        
        )}
        {isResetPassword && (
          <>
            <label className={style["label"]}>
          {authTrans(TRANSLATIONSAPPCONSTANTS.NEWPASSWORD)}
        </label>
        <Input
        type="password"
        name="password"
        placeholder={authTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERNEWPASS)}
        value={formData.password}
        onChange={onChange}
        classname={style["input"]}
      />
        <label className={style["label"]}>
         {authTrans(TRANSLATIONSAPPCONSTANTS.CONFIRMPASSWORD)}
        </label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder={authTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERCONFIRMPASS)}
        value={formData.confirmPassword}
        onChange={onChange}
        classname={style["input"]}
      /></>
        )}

         <br />
        <div className={style["form-links"]}>
          {renderLinks}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={style["form-button"]}
        >
          {loading
            ? authTrans(TRANSLATIONSAPPCONSTANTS.LOADAUTH)
            : isLogin
              ? authTrans(TRANSLATIONSAPPCONSTANTS.LOGINBTN)
              : isRegister 
              ? authTrans(TRANSLATIONSAPPCONSTANTS.REGISTERBTN)
              : isForgetPass 
            ? authTrans(TRANSLATIONSAPPCONSTANTS.FORGETPASSBTN)
            : isResetPassword 
            ? authTrans(TRANSLATIONSAPPCONSTANTS.RESETPASSWORDBTN)
          : ""}
        </button>
      </form>
    </>
  );
}
