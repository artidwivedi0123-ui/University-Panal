import { useEffect, useState } from "react";
import { IStudentsData } from "../modules/university/student/modal/IStudents";
import { StudentApiProvider } from "../modules/university/student/provider/studentProvider";

export const useStudentList = () => {
  const [student, setStudent] = useState<IStudentsData[]>([]);

  useEffect(() => {
    StudentApiProvider.apolloInstance.getAllStudents(
      (res) => {
        setStudent(res.data);
      },
      console.error
    );
  }, []);

  return { student };
};