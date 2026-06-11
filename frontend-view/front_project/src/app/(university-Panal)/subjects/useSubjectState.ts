import { APPCONSTANTS } from "@/src/constants/app.constants";
import {
  ICourseSummary,
  ISubjectById,
  ISubjectDashboard,
  ISubjectData,
  ISubjectInput,
} from "@/src/modules/university/subject/modal/ISubject";
import { SubjectApiProvider } from "@/src/modules/university/subject/provider/subjectProvider";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export const UseSubjectState = () => {
  const [subjects, setSubjects] = useState<ISubjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();
  const id = params?.id as string;
  const isEdit = !!id;
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(APPCONSTANTS.PAGE);
  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [courses, setCourses] = useState<ICourseSummary[]>([]);
  const [totalRecordSub, setTotalRecordSub] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [subDashboard, setSubDashboard] = useState<ISubjectDashboard[]>([]);
  const [totalSubjects, setTotalSubjects] = useState<number>(0);
  const [subjectDetails, setSubjectDetails] = useState<ISubjectById | null>(null);
  const [subjectData, setSubjectData] = useState<ISubjectData>({
    subject_name: "",
    credits: 4,
    subject_code: "",
    semester_id: 0,
    course_name: "",
  });
  const router = useRouter();
  const limit = APPCONSTANTS.LIMIT;

  const fetchSubjects = () => {
    SubjectApiProvider.apolloInstance.getSubjects(
      page,
      limit,
      search,
      (res) => {
        setSubjects(res.data);
        setTotalPages(res.pagination.totalPages);
        setTotalRecordSub(res.pagination.totalRecords);
      },
      console.error,
    );
  };

  useEffect(() => {
    fetchSubjects();
  }, [page, search]);

  const handleChangeSubject = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setSubjectData((prev) => ({
      ...prev,
      [name]:
        name === "credits" || name === "semester_id" ? Number(value) : value,
    }));
  };

  const handleSubmitSubjects = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const payload: ISubjectInput = {
      subject_name: subjectData.subject_name,
      subject_code: subjectData.subject_code,
      credits: subjectData.credits,
      semester_id: subjectData.semester_id,
      course_name: subjectData.course_name,
    };

    if (isEdit) {
      SubjectApiProvider.apolloInstance.updateSubject(
        Number(id),
        payload,
        () => {
          toast.success("Subject Updated Successfully!!");
          console.log("payload", payload);
          router.push("/subjects");
        },
        (err) => {
          toast.error(err?.response?.data.message);
        },
      );
    } else {
      SubjectApiProvider.apolloInstance.createSubject(
        payload,
        (res) => {
          setLoading(false);

          toast.success("Subject Added Successfully");

          router.push("/subjects");
        },
        (err) => {
          setLoading(false);

          toast.error(
            err?.response?.data?.message || "Error in Adding Subject",
          );
        },
      );
    }
  };

  const openDeleteModal = (id: number) => {
    setSelectedSubjectId(id);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedSubjectId(null);
    setShowModal(false);
  };

  const handleDeleteSubject = () => {
    setLoading(true);
    if (selectedSubjectId === null) return;

    SubjectApiProvider.apolloInstance.deleteSubject(
      selectedSubjectId,
      (res) => {
        setLoading(false);
        setSubjects((prev) => prev.filter((sb) => sb.id !== selectedSubjectId));
        toast.success("Deleted Successfully !!");
        closeDeleteModal();
      },
      (err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message) ||
          "Error while deleting Subject";
      },
    );
  };

  const fetchSubjectById = () => {
    if (!id) return;

    SubjectApiProvider.apolloInstance.getSubjectById(
      Number(id),
      (res) => {
        setSubjectDetails(res.data);
        console.log("Subject By ID =", res.data);
        setSubjectData({
          subject_name: res.data.subject_name,
          course_name: res.data.course_name,
          credits: res.data.credits,
          semester_id: res.data.semester_id,
          subject_code: res.data.subject_code,
        });
      },
      (err) => {
        console.error(err);
      },
    );
  };

  useEffect(() => {
    fetchSubjectById();
  }, [id]);

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
    fetchSubjects();
  };

  const fetchSubDashboard = () => {
    SubjectApiProvider.apolloInstance.getSubjectDashboard(
      (res) => {
        setSubDashboard(res.semesterWise);
        setTotalSubjects(res.totalSubjects);
        setCourses(res.courses);
      },
      (err) => {
        toast.error("Error in fetching Subject Dashboard");
      },
    );
  };

  useEffect(() => {
    fetchSubDashboard();
  }, []);

  return {
    subjects,
    setSubjectData,
    handleChangeSubject,
    handleSubmitSubjects,
    subjectData,
    loading,
    router,
    showModal,
    closeDeleteModal,
    openDeleteModal,
    subjectDetails,
    handleDeleteSubject,
    page,
    setPage,
    search,
    setSearch,
    totalPages,
    totalRecords: totalRecordSub,
    handleSearch,
    limit,
    searchInput,
    setSearchInput,
    subDashboard,
    totalSubjects,
    courses,
  };
};
