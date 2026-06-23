import { useEffect, useState } from "react";
import { IStudentsData } from "../modules/university/student/modal/IStudents";
import { StudentApiProvider } from "../modules/university/student/provider/studentProvider";
import { toast } from "react-toastify";

export const useStudentList = () => {
  const [student, setStudent] = useState<IStudentsData[]>([]);
  useEffect(() => {
    StudentApiProvider.apolloInstance.getAllStudents(
      (res) => {
        setStudent(res.data);
      },
      (err) => {
        toast.error(
          err?.response?.data?.message ||
            "Error while fectching all Student Listing",
        );
      },
    );
  }, []);

  return { student };
};
