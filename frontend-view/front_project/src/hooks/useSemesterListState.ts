import { useEffect, useState } from "react";
import { SemesterApiProvider } from "../modules/university/semester/provider/semesterProvider";
import { ISemesterData } from "../modules/university/semester/modal/ISemester";

export const useSemesterList = () => {
  const [semester, setSemester] = useState<ISemesterData[]>([]);

  useEffect(() => {
    SemesterApiProvider.apolloInstance.getSemester(
      (res) => {
        setSemester(res.data);
      },
      console.error
    );
  }, []);

  return { semester };
};