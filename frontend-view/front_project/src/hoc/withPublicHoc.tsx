import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import { useEffect } from "react";
import { ROLENUM } from "@/src/constants/enum.constants";
import {
  STUDENTPROFILEROUTES,
  UNIVERSITYROUTES,
} from "@/src/constants/routes.contants";

export const withPublicAuth = (WrappedComponent: React.ComponentType) => {
  return function withStudentPublic(props: any) {
    const { loading, isAuthenticated, role } = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (loading) return;

      if (!isAuthenticated) return;

      if (!role) return;

      if (role === ROLENUM.ADMIN) {
        router.replace(UNIVERSITYROUTES.UNIVERSITYDASHBOARD);
      } else {
        router.replace(STUDENTPROFILEROUTES.STUDENTDASHBOARD);
      }
    }, [loading, role, isAuthenticated, router]);

    return <WrappedComponent {...props} />;
  };
};
