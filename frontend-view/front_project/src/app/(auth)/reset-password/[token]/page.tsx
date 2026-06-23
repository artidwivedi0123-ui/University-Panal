"use client";

import { useParams } from "next/navigation";
import { UseAuthState } from "@/src/components/AuthForm/useAuthState";
import AuthForm from "@/src/components/AuthForm/AuthForm";
import { AUTH_SECTION_TYPE } from "@/src/types/auth-section.type";

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params.token as string;

  const {
    resetPassData,
    handleResetChange,
    handleResetSubmit,
    loading,
  } = UseAuthState();

  return (
   <AuthForm
   formData={resetPassData}
   loading={loading}
   onChange={handleResetChange}
   onSubmit={(e)=>handleResetSubmit(token,e)}
   type={AUTH_SECTION_TYPE.RESET_PASSWORD}
   />

  );
}