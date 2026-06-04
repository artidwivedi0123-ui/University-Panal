import { ICourseData, ICourseInput } from "@/src/modules/university/course/modal/ICourse";
import { CourseApiProvider } from "@/src/modules/university/course/provider/courseProvider";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useCoursesState = () => {
  const [course, setCourse] = useState<ICourseData[]>();


  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchCourses = () => {
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
  };

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
