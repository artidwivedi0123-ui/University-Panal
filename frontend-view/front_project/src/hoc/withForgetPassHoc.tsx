"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { ROLENUM } from "../constants/enum.constants";
import { STUDENTPROFILEROUTES, UNIVERSITYROUTES } from "../constants/routes.contants";
const withForgotFlow = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Component = (props: P) => {
    const router = useRouter();
    const {role,loading,isAuthenticated} = useAuth();

    useEffect(() => {
        if(loading) return;
        
        if(!isAuthenticated) return ;

        if(role === ROLENUM.ADMIN) {
            router.replace(UNIVERSITYROUTES.UNIVERSITYDASHBOARD);
        }
        else {
            router.replace(STUDENTPROFILEROUTES.STUDENTDASHBOARD);
        }
     
    }, [ router,role,loading,isAuthenticated]);

 
    return <WrappedComponent {...props} />;
  };

  return Component;
};

export default withForgotFlow;