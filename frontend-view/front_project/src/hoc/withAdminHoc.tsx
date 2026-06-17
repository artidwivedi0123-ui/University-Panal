import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const withAdmin = (
  WrappedComponent: React.ComponentType
) => {
  return function AdminRoute(
    props: any
  ) {
    const {
      user,
      loading,
    } = useAuth();

    const router = useRouter();

    useEffect(() => {
      if (loading) return;

      if (!user) {
        router.replace("/login");
        return;
      }

      if (user.role !== "admin") {
        router.replace("/courses");
      }
    }, [
      user,
      loading,
      router,
    ]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return null;
    }

    if (user.role !== "admin") {
      return null;
    }

    return (
      <WrappedComponent
        {...props}
      />
    );
  };
};