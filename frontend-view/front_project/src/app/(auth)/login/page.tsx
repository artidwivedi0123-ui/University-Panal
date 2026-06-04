"use client";
import AuthForm from "@/src/components/AuthForm/AuthForm";
import { UseAuthState } from "@/src/components/AuthForm/useAuthState";
import { AUTH_SECTION_TYPE } from "@/src/types/auth-section.type";

export default  function Register (){
    const {
        handleLoginChange,
        handleLoginSubmit,
        loginData,
        loading,
    } = UseAuthState();
    return (
        <AuthForm
         formData={loginData}
         loading={loading}
         onChange={handleLoginChange}
         onSubmit={handleLoginSubmit}
         type={AUTH_SECTION_TYPE.LOGIN}
         />
    )
}