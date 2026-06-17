import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export const withStudent = (
  WrappedComponent: React.ComponentType
) => {
  return function StudentRoute(
    props: any
  ) {
    const { user ,loading } = useAuth();

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
}, [user, loading]);

    if (user?.role !== "student")
      router.replace("/login");

    return (
      <WrappedComponent
        {...props}
      />
    );
  };
};