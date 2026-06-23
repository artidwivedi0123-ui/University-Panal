import { useEffect, useState } from "react";
import { SemesterApiProvider } from "../modules/university/semester/provider/semesterProvider";
import { ISemesterData } from "../modules/university/semester/modal/ISemester";
import { toast } from "react-toastify";

export const useSemesterList = () => {
  const [semester, setSemester] = useState<ISemesterData[]>([]);
  useEffect(() => {
    SemesterApiProvider.apolloInstance.getSemester(
      (res) => {
        setSemester(res.data);
      },
      (err) => {
        toast.error(
          err?.res?.data?.message || "Error in while fetch Semester Details",
        );
      },
    );
  }, []);

  return { semester };
};
