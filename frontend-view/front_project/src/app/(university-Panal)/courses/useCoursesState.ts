import { ICourseData } from "@/src/modules/university/course/modal/ICourse";
import { CourseApiProvider } from "@/src/modules/university/course/provider/courseProvider";
import {  useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useCoursesState = () => {
  const [course, setCourse] = useState<ICourseData[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchCourses = useCallback(() => {
    setLoading(true);
    CourseApiProvider.apolloInstance.getCourse(
      (res) => {
        setLoading(false);
        setCourse(res?.data);
      },
      (err) => {
        setLoading(false);
        console.error(err);
      },
    );
  },[loading]);

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    course,
    setCourse,
    loading,
    router,

  };
};
