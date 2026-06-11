import { ISemesterData } from "@/src/modules/university/semester/modal/ISemester";
import { SemesterApiProvider } from "@/src/modules/university/semester/provider/semesterProvider";
import { useCallback, useEffect, useState } from "react";

export const UseSemesterState = () => {
  const [semester, setSemester] = useState<ISemesterData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSemester = useCallback(() => {
    setLoading(true);
    SemesterApiProvider.apolloInstance.getSemester(
      (res) => {
        setSemester(res.data);
        setLoading(false);
      },
      (err) => {
        console.log(err);
        setLoading(false);
      }
    );
  },[]);

  useEffect(() => {
    fetchSemester();
  }, [fetchSemester]);

  return {
    semester,
    loading,
  };
};