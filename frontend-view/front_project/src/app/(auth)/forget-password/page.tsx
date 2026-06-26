"use client";
import AuthForm from "@/src/components/AuthForm/AuthForm";
import { UseAuthState } from "@/src/components/AuthForm/useAuthState";
import withForgotFlow from "@/src/hoc/withForgetPassHoc";
import { AUTH_SECTION_TYPE } from "@/src/types/auth-section.type";

function ForgetPasswordPage(){
    const  {forgotpass,handleForgetChange,handleForgetSubmit,loading} = UseAuthState();
    return (
        <AuthForm
         formData={forgotpass}
         loading={loading}
         onChange={handleForgetChange}
         onSubmit={handleForgetSubmit}
         type={AUTH_SECTION_TYPE.FORGET_PASSWORD}
         >
        </AuthForm>
    )
};
export default withForgotFlow(ForgetPasswordPage);