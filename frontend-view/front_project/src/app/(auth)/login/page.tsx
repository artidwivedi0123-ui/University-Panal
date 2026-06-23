"use client";
import AuthForm from "@/src/components/AuthForm/AuthForm";
import { UseAuthState } from "@/src/components/AuthForm/useAuthState";
import { withPublicAuth } from "@/src/hoc/withPublicHoc";
import { AUTH_SECTION_TYPE } from "@/src/types/auth-section.type";
import Link from "next/link";

function Login() {
  const { handleLoginChange, handleLoginSubmit, loginData, loading, router } =
    UseAuthState();
  return (
    <>
      <AuthForm
        formData={loginData}
        loading={loading}
        onChange={handleLoginChange}
        onSubmit={handleLoginSubmit}
        type={AUTH_SECTION_TYPE.LOGIN}
        renderLinks={
          <>
            <div>
              <Link href={"/forget-password"}>Forget Password</Link>
            </div>
            <div>
              <span>Don't have an Account?</span>
              <Link href={"/register"}>Register Here</Link>
            </div>
          </>
        }
      />
    </>
  );
}
export default withPublicAuth(Login);
