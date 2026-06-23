import { APPCONSTANTS } from "@/src/constants/app.constants";
import { UNIVERSITYROUTES } from "@/src/constants/routes.contants";
import {
  IStudentDetailInput,
  IStudentDetailsById,
  IStudentDetailsData,
} from "@/src/modules/university/studentsDetail/model/IStudentDetails";
import { StudentDetailApiProvider } from "@/src/modules/university/studentsDetail/provider/studentDetail.provider";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useStudentDetailsState = () => {
  const params = useParams();
  const id = params?.id as string;
  const isEdit = !!id;
  const [selectedStuDelId, setSelectedStuDelId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [studentDetailbyId, setStudentDetailById] =
    useState<IStudentDetailsById | null>(null);
  const [studentDetail, setStudentDetails] = useState<IStudentDetailsData[]>(
    [],
  );
  const [page, setPage] = useState<number>(APPCONSTANTS.PAGE);
  const [limit, setLimit] = useState<number>(APPCONSTANTS.LIMIT);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>("");
  const [stuDetailInput, setStuDetailInput] = useState<IStudentDetailInput>({
    student_id: 0,
    full_name: "",
    address: "",
    city: "",
    country: "",
    date_of_birth: "",
    email: "",
    father_name: "",
    mother_name: "",
    phone_number: "",
    previous_college: "",
    previous_school: "",
    previous_study_field: "",
    state: "",
  });
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalRecordStudDet, setTotalRecordStuDet] = useState<number>(0);
  const payload: IStudentDetailInput = {
    student_id: stuDetailInput.student_id,
    full_name: stuDetailInput.full_name,
    email: stuDetailInput.email,
    phone_number: stuDetailInput.phone_number,
    address: stuDetailInput.address,
    city: stuDetailInput.city,
    state: stuDetailInput.state,
    country: stuDetailInput.country,
    father_name: stuDetailInput.father_name,
    date_of_birth: stuDetailInput.date_of_birth,
    mother_name: stuDetailInput.mother_name,
    previous_school: stuDetailInput.previous_school,
    previous_college: stuDetailInput.previous_college,
    previous_study_field: stuDetailInput.previous_study_field,
  };

  const fetchStudentDetails = useCallback(() => {
    setLoading(true);
    StudentDetailApiProvider.apolloInstance.getStudentDetails(
      page,
      limit,
      search,
      (res) => {
        setLoading(false);
        setStudentDetails(res.data);
        setTotalPages(res.pagination.totalPages);
        setTotalRecordStuDet(res.pagination.totalRecords);
        setLimit(res.pagination.limit);
      },
      (err) => {
        setLoading(false);
        toast.error(
          err?.response?.data?.meesage ||
            "Error while Fetching Student Profile",
        );
      },
    );
  }, [page, limit, search]);

  useEffect(() => {
    fetchStudentDetails();
  }, [fetchStudentDetails]);

  const handleSearch = useCallback(() => {
    setPage(1);
    setSearch(searchInput);
  }, [searchInput]);

  const handleStudeDetailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setStuDetailInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitStudentDetails = (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setLoading(true);
    if (isEdit) {
      StudentDetailApiProvider.apolloInstance.updateStudentDetails(
        Number(id),
        payload,
        (res) => {
          toast.success("Student Details Updated Sucessfully");
          router.push(UNIVERSITYROUTES.STUDENTPROFILEDETAIL);
        },
        (err) => {
          toast.error(
            err?.response?.data?.message ||
              "Error while Updating Student Details",
          );
        },
      );
    } else {
      StudentDetailApiProvider.apolloInstance.addStudentDetails(
        payload,
        (res) => {
          setLoading(false);
          console.log(res.data);
          console.log("Student Input", setStuDetailInput);
          toast.success("Student Detail added successfully");
          router.push(UNIVERSITYROUTES.STUDENTPROFILEDETAIL);
        },
        (err) => {
          setLoading(false);
          toast.error(
            err?.response?.data?.meesage ||
              "Error while adding Student Profile",
          );
        },
      );
    }
  };

  const openDeleteModal = (id: number) => {
    setSelectedStuDelId(id);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedStuDelId(null);
    setShowModal(false);
  };

  const handleDeleteSubjectDetails = () => {
    setLoading(true);
    if (selectedStuDelId === null) return;

    StudentDetailApiProvider.apolloInstance.deleteStudentDetails(
      selectedStuDelId,
      (res) => {
        setLoading(false);
        setStudentDetails((prev) =>
          prev.filter((it) => it.id !== selectedStuDelId),
        );
        closeDeleteModal();
        toast.success("Student Details Deleted Successfully");
      },
      (err) => {
        toast.error(
          err?.response?.data?.meesage ||
            " Error while deleting Student Detail",
        );
      },
    );
  };

  const fetchStudentDetailsByID = useCallback(() => {
    if (!id) return;
    setLoading(true);

    StudentDetailApiProvider.apolloInstance.getStudentDetailsById(
      Number(id),
      (res) => {
        setStudentDetailById(res.data);
        setStuDetailInput({
          student_id: res.data.student_id,
          full_name: res.data.full_name,
          email: res.data.email,
          phone_number: res.data.phone_number,
          address: res.data.address,
          city: res.data.city,
          state: res.data.state,
          country: res.data.country,
          date_of_birth: res.data.date_of_birth?.split("T")[0] || "",
          father_name: res.data.father_name,
          mother_name: res.data.mother_name,
          previous_college: res.data.previous_college,
          previous_school: res.data.previous_school,
          previous_study_field: res.data.previous_study_field,
        });
      },
      (err) => {
        toast.error(
          err?.response?.data?.meesage || "Error in fetch details of Students",
        );
      },
    );
  }, [id]);

  useEffect(() => {
    fetchStudentDetailsByID();
  }, [fetchStudentDetailsByID]);

  return {
    studentDetail,
    page,
    setPage,
    handleSearch,
    totalPages,
    totalRecordStudDet,
    searchInput,
    setSearchInput,
    router,
    handleSubmitStudentDetails,
    handleStudeDetailChange,
    stuDetailInput,
    setStuDetailInput,
    studentDetailbyId,
    openDeleteModal,
    closeDeleteModal,
    handleDeleteSubjectDetails,
    showModal,
    selectedStuDelId,
    loading,
  };
};
