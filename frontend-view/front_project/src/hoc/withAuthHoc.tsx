import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { AUTHROUTES } from "@/src/constants/routes.contants";

export const withAuth = (WrappedComponent: React.ComponentType) => {
  return function ProtectedRoute(props: any) {
    const { isAuthenticated, loading } = useAuth();

    const router = useRouter();

    useEffect(() => {
      if (loading) return;

      if (!isAuthenticated) {
        router.replace(AUTHROUTES.LOGIN);
      }
    }, [loading, isAuthenticated, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};
