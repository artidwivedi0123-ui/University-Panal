import { ISemesterData } from "@/src/modules/university/semester/modal/ISemester";
import { SemesterApiProvider } from "@/src/modules/university/semester/provider/semesterProvider";
import { useEffect, useState } from "react";

export const UseSemesterState = () => {
  const [semester, setSemester] = useState<ISemesterData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSemester = () => {
    setLoading(true);

    SemesterApiProvider.apolloInstance.getSemester(
      (res) => {
        setSemester(res.data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchSemester();
  }, []);

  return {
    semester,
    loading,
  };
};