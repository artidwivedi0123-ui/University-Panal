"use client";
import AuthForm from "@/src/components/AuthForm/AuthForm";
import { UseAuthState } from "@/src/components/AuthForm/useAuthState";
import { AUTH_SECTION_TYPE } from "@/src/types/auth-section.type";

export default function ForgetPasswordPage(){
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
}