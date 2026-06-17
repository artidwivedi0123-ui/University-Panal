import { useEffect, useState } from "react";
import { CourseApiProvider } from "../modules/university/course/provider/courseProvider";
import { ICourseData } from "../modules/university/course/modal/ICourse";

export const useCourseList = () => {
  const [course, setCourse] = useState<ICourseData[]>([]);

  useEffect(() => {
    CourseApiProvider.apolloInstance.getCourse(
      (res) => {
        setCourse(res.data);
      },
      console.error
    );
  }, []);

  return { course };
};