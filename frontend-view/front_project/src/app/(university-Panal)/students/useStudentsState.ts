import {
  IStudentById,
  IStudentCourseSummary,
  IStudentDashboard,
  IStudentsData,
  IStudentsInput,
} from "@/src/modules/university/student/modal/IStudents";
import { StudentApiProvider } from "@/src/modules/university/student/provider/studentProvider";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { UNIVERSITYROUTES } from "@/src/constants/routes.contants";
import { APPCONSTANTS } from "@/src/constants/app.constants";

export const useStudentsState = () => {
  const params = useParams();
  const id = params?.id as string;
  const isEdit = !!id;
  const [students, setStudents] = useState<IStudentsData[]>([]);
  const [studentDetails, setStudentDetails] = useState<IStudentById | null>(
    null,
  );
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null,
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(APPCONSTANTS.PAGE);
  const [search, setSearch] = useState<string>("");
  const [courses, setCourses] = useState<IStudentCourseSummary[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalRecordStu, setTotalRecordStu] = useState<number>(0);
  const [stuDashboard, setStuDashboard] = useState<IStudentDashboard[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [studentData, setStudentData] = useState<IStudentsInput>({
    name: "",
    roll_number: "",
    gender: "",
    marks: 0,
    grade_points: 0,
    result: "",
    course_id: 0,
    semester_id: 0,
  });
  const limit = APPCONSTANTS.LIMIT;
  const router = useRouter();
  const fetchStudents = useCallback(() => {
    setLoading(true);
    StudentApiProvider.apolloInstance.getStudent(
      page,
      limit,
      search,
      (res) => {
        setLoading(false);
        setStudents(res.data);
        setTotalPages(res.pagination.totalPages);
        setTotalRecordStu(res.pagination.totalRecords);
      },
      (err) => {
        setLoading(false);
        console.error(err);
      },
    );
  },[page,search,limit]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

 const handleChangeStudent = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
) => {
  const { name, value } = e.target;
  setStudentData((prev) => ({
    ...prev,
    [name]:
      ["marks", "grade_points", "course_id", "semester_id"].includes(name)
        ? Number(value)
        : value,
  }));
};


  const validateStudent = (data: typeof studentData) => {
  switch (true) {
    case !data.course_id || !data.semester_id:
      return "Please select Course and Semester";

    case !data.name?.trim():
      return "Student Name is required";

    case !data.roll_number?.trim():
      return "Student Roll Number is required";

    case !data.gender:
      return "Please select Gender";

    case !["M", "F"].includes(data.gender):
      return "Gender must be M or F";

    case !data.result:
      return "Please select Result";

    case !["Pass", "Fail"].includes(data.result):
      return "Result must be Pass or Fail";

    case data.marks < 0 || data.marks > 100:
      return "Marks must be between 0 and 100";

    case data.grade_points < 0 || data.grade_points > 10:
      return "Grade Points must be between 0 and 10";

    default:
      return null;
  }
};

  const handleSubmitStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkError = validateStudent(studentData);
    if(checkError) {
      return toast.error(checkError);
    }
    const payload: IStudentsInput = {
      name: studentData.name,
      roll_number: studentData.roll_number,
      gender: studentData.gender,
      marks: studentData.marks,
      grade_points: studentData.grade_points,
      result: studentData.result,
      course_id: studentData.course_id,
      semester_id: studentData.semester_id,
    };
    if (isEdit) {
      StudentApiProvider.apolloInstance.updateStudent(
        Number(id),
        payload,
        () => {
          toast.success("Student Updated Successfully");
          router.push(UNIVERSITYROUTES.STUDENTS);
        },
        (err) => {
          toast.error(err?.response?.data?.message);
        },
      );
    } else {
      StudentApiProvider.apolloInstance.createStudent(
        payload,
        (res) => {
          toast.success("Student Added Successfully");
          router.push(UNIVERSITYROUTES.STUDENTS);
        },
        (err) => {
          toast.error(err?.res?.data?.message);
        },
      );
    }
  };
  
  const openDeleteModal = useCallback((id: number) => {
    setSelectedStudentId(id);
    setShowModal(true);
  },[]);

  const closeDeleteModal = useCallback(() => {
    setSelectedStudentId(null);
    setShowModal(false);
  },[]);

  const handleDeleteStudent = useCallback(() => {
    setLoading(true);
    if (selectedStudentId === null) return;

    StudentApiProvider.apolloInstance.deleteStudent(
      selectedStudentId,
      (res) => {
        setLoading(false);
        setStudents((prev) => prev.filter((st) => st.id !== selectedStudentId));
        toast.success("Deleted Successfully!!");
        closeDeleteModal();
      },
      (err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message) ||
          "Error  while in deleting Student";
      },
    );
  },[]);

  const fetchStudentById = useCallback(() => {
    if (!id) return;
    StudentApiProvider.apolloInstance.getStudentById(
      Number(id),
      (res) => {
        setStudentDetails(res.data);
        setStudentData({
          name: res.data.name,
          roll_number: res.data.roll_number,
          gender: res.data.gender,
          marks: res.data.marks,
          grade_points: res.data.grade_points,
          result: res.data.result,
          course_id: res.data.course_id,
          semester_id: res.data.semester_id,
        });
      },
      console.error,
    );
  },[id]);

  useEffect(() => {
    fetchStudentById();
  }, [fetchStudentById]);

  const handleSearch = useCallback(() => {
    setPage(1);
    setSearch(searchInput);
  },[searchInput]);

  const fetchStuDashboard = useCallback(() => {
    StudentApiProvider.apolloInstance.getStudentDashboard(
      (res) => {
        setStuDashboard(res.dashboard);
        setTotalStudents(res.totalStudents);
        setCourses(res.students);
      },
      (err) => {
        toast.error(err.response.data.message || "Error  while adding content");
      },
    );
  },[]);

  useEffect(() => {
    fetchStuDashboard();
  }, [fetchStuDashboard]);

  return {
    studentDetails,
    students,
    setStudents,
    studentData,
    setStudentData,
    handleChangeStudent,
    handleSubmitStudent,
    loading,
    router,
    handleDeleteStudent,
    closeDeleteModal,
    openDeleteModal,
    showModal,
    page,
    setPage,
    search,
    setSearch,
    limit,
    totalPages,
    searchInput,
    setSearchInput,
    handleSearch,
    totalRecordStu,
    totalStudents,
    stuDashboard,
    courses,
  };
};



 