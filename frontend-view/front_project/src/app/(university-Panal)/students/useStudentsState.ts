import {
  IStudentById,
  IStudentDashboard,
  IStudentsData,
  IStudentsInput,
} from "@/src/modules/university/student/modal/IStudents";
import { StudentApiProvider } from "@/src/modules/university/student/provider/studentProvider";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";

export const useStudentsState = () => {
  const params = useParams();
  const id  = params?.id as string;
  const isEdit = !!id;
  const [students, setStudents] = useState<IStudentsData[]>([]);
  const [studentDetails, setStudentDetails] = useState<IStudentById | null>(null);
const [selectedStudentId,setSelectedStudentId]  = useState<number | null>(null);
const [showModal,setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page,setPage] = useState<number>(1);
  const [limit,setLimit] = useState<number>(10);
  const [search,setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [totalPages,setTotalPages]= useState<number>(0);
  const [totalRecordStu,setTotalRecordStu]= useState<number>(0);
  const [stuDashboard,setStuDashboard] = useState<IStudentDashboard[]>([]);
  const [totalStudents,setTotalStudents]= useState<number>(0);
  // console.log(params.id);

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
  const router = useRouter();
  const fetchStudents = () => {
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
  };

  useEffect(() => {
    fetchStudents();
  }, [page,search]);

  const handleChangeStudent = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: ["marks", "grade_points", "course_id", "semester_id"].includes(
        name,
      )
        ? value
          ? Number(value)
          : 0
        : value,
    }));
  };
  const handleSubmitStudent = (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

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
        toast.success(
          "Student Updated Successfully"
        );
        router.push("/students");
      },
      (err) => {
        toast.error(
          err?.response?.data?.message
        );
      }
    );
  } else {
    StudentApiProvider.apolloInstance.createStudent(
      payload,
      () => {
        toast.success(
          "Student Added Successfully"
        );

        router.push("/students");
      },
      (err) => {
        toast.error(
          err?.response?.data?.message
        );
      }
    );
  }
};
  const openDeleteModal = (id:number)=>{
      setSelectedStudentId(id);
      setShowModal(true);
  };

  const closeDeleteModal = ()=>{
      setSelectedStudentId(null);
      setShowModal(false);
  };

  const handleDeleteStudent = () => {
     setLoading(true);
    if(selectedStudentId === null)
      return ;

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
  };

const fetchStudentById = () => {

  console.log("id =", id);

  if (!id) return;

  StudentApiProvider.apolloInstance
    .getStudentById(
      Number(id),
      (res) => {
        setStudentDetails(res.data);

        setStudentData({
          name: res.data.name,
          roll_number: res.data.roll_number,
          gender: res.data.gender,
          marks: res.data.marks,
          grade_points:
            res.data.grade_points,
          result: res.data.result,
          course_id:
            res.data.course_id,
          semester_id:
            res.data.semester_id,
        });
      },
      console.error
    );
};

useEffect(()=>{
  fetchStudentById()
},[id]);

const handleSearch = () => {
  setPage(1);
  setSearch(searchInput);
  fetchStudents();
};
 

const fetchStuDashboard = () => {
  StudentApiProvider.apolloInstance.getStudentDashboard(
    (res)=>{
      setStuDashboard(res.dashboard);
      setTotalStudents(res.totalStudents);
    },
    (err)=>{
      toast.error("Error  in fetching Students Dashboard");
    }
  )
}


useEffect(()=>{
  fetchStuDashboard();
},[]);

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
    stuDashboard
  };
};
