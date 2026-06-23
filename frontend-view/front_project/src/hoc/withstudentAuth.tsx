import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { ROLENUM } from "../constants/enum.constants";
import { AUTHROUTES, STUDENTPROFILEROUTES } from "../constants/routes.contants";

export const withStudent = (WrappedComponent: React.ComponentType) => {
  return function StudentRoute(props: any) {
    const { user, loading } = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (loading) return;

      if (!user) {
        router.replace(AUTHROUTES.LOGIN);
        return;
      }

      if (user.role !== ROLENUM.ADMIN) {
        router.replace(STUDENTPROFILEROUTES.STUDENTDASHBOARD);
      }
    }, [user, loading]);

    if (user?.role !== ROLENUM.STUDENT) {
      router.replace(AUTHROUTES.LOGIN);
    }
    return <WrappedComponent {...props} />;
  };
};
