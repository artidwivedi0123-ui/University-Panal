"use client";
import AuthForm from "@/src/components/AuthForm/AuthForm";
import { UseAuthState } from "@/src/components/AuthForm/useAuthState";
import { AUTH_SECTION_TYPE } from "@/src/types/auth-section.type";

export default  function Register (){
    const {
        handleRegisterChange,
        handleRegisterSubmit,
        registerData,
        loading,
    } = UseAuthState();
    return (
        <AuthForm
         formData={registerData}
         loading={loading}
         onChange={handleRegisterChange}
         onSubmit={handleRegisterSubmit}
         type={AUTH_SECTION_TYPE.REGISTER}
         />
    )
}