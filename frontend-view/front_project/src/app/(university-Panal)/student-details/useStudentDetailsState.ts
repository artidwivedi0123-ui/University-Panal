import { APPCONSTANTS } from "@/src/constants/app.constants";
import {
  IStudentDetailInput,
  IStudentDetailsData,
} from "@/src/modules/university/studentsDetail/model/IStudentDetails";
import { StudentDetailApiProvider } from "@/src/modules/university/studentsDetail/provider/studentDetail.provider";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useStudentDetailsState = () => {
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
    setSearch(searchInput);
    setPage(1);
  }, [searchInput]);

  const handleStudeDetailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
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
      previous_study_field: stuDetailInput.previous_study_field,
    };
    console.log("payload",payload);
    console.log("Student Input",stuDetailInput);

    StudentDetailApiProvider.apolloInstance.addStudentDetails(
      payload,
      (res) => {
        setLoading(false);
        console.log(res.data);
        console.log("Student Input",setStuDetailInput);
        toast.success("Student Detail added successfully");
        router.push("/student-details");
      },
      (err) => {
        setLoading(false);
        toast.error(
          err?.response?.data?.meesage || "Error while adding Student Profile",
        );
      },
    );
  };

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
    setStuDetailInput
  };
};
