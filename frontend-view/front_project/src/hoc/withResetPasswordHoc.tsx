"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { AUTHROUTES, STUDENTPROFILEROUTES, UNIVERSITYROUTES } from "../constants/routes.contants";
import { ROLENUM } from "../constants/enum.constants";
const withResetPassword = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Component = (props: P) => {
    const router = useRouter();
    const {loading,isAuthenticated,role} = useAuth();
    useEffect(() => {
        if(loading) return ;

        if(!isAuthenticated) {
            router.replace(AUTHROUTES.LOGIN);
        }
          if (role === ROLENUM.ADMIN) {
            router.replace(UNIVERSITYROUTES.UNIVERSITYDASHBOARD);
          } else {
            router.replace(STUDENTPROFILEROUTES.STUDENTDASHBOARD);
          }

    
    }, [loading,isAuthenticated,router]);

    
    return <WrappedComponent {...props} />;
  };

  return Component;
};

export default withResetPassword;