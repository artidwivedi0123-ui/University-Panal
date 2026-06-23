import { useEffect, useState } from "react";
import { CourseApiProvider } from "../modules/university/course/provider/courseProvider";
import { ICourseData } from "../modules/university/course/modal/ICourse";
import { toast } from "react-toastify";

export const useCourseList = () => {
  const [course, setCourse] = useState<ICourseData[]>([]);
  useEffect(() => {
    CourseApiProvider.apolloInstance.getCourse(
      (res) => {
        setCourse(res.data);
      },
      (err) => {
        toast.error(
          err?.response?.data?.message || "Error while fetching Courses List ",
        );
      },
    );
  }, []);
  return { course };
};
