import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ROLENUM } from "../constants/enum.constants";
import { AUTHROUTES, STUDENTPROFILEROUTES } from "../constants/routes.contants";

export const withAdmin = (WrappedComponent: React.ComponentType) => {
  return function AdminRoute(props: any) {
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
    }, [user, loading, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return null;
    }

    if (user.role !== ROLENUM.ADMIN) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};
