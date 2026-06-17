import {
  IStudentFees,
  IStudentFeesData,
  IStudentFeesDetailsById,
  IStudentFeesInput,
} from "@/src/modules/fees/fees-student/modal/IStudent.fees";
import { StudentFeesApiProvider } from "@/src/modules/fees/fees-student/provider/student-fees.provider";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export const useStudentFeesState = () => {
const [stuFeesInput, setStudFeesInput] = useState<IStudentFeesInput>({
  student_id: 0,
  fee_structure_id: 0,
  amount_paid: 0,
  due_amount: 0,
  payment_status: "",
  payment_date: "",
});
  const params  = useParams();
  const id = params?.id as string;
  const isEdit = !!id;
  const [studFeesDetails,setStudFeesDetails]= useState<IStudentFeesDetailsById | null>(null);
  const [showModal,setShowModal] = useState<boolean>(false);
  const [page,setPage]= useState<number>(1);
  const [search,setSearch]= useState<string>("");
  const [searchInput,setSearchInput]= useState<string>("");
  const [totalRecords,setTotalRecords]= useState<number>(0);
  const [limit,setLimit]= useState<number>(10);
  const [totalPages,setTotalPages] = useState<number>(0);
  const [selectStudFeeId,setSelectStudFeeId]= useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [studFeesData, setStuFeesData] = useState<IStudentFees[]>([]);

  const fetchStudentFees = () => {
    setLoading(true);
    StudentFeesApiProvider.apolloInstance.getFeesStudent(
      page,
      limit,
      search,
      (res) => {
        setLoading(false);
        setStuFeesData(res.data);
        setTotalRecords(res.pagination.totalRecords);
        setTotalPages(res.pagination.totalPage);
        
      },
      (err) => {
        setLoading(false);
        toast.error("Error in fetch Student Fees");
      },
    );
  };

  useEffect(()=>{
    fetchStudentFees();
  },[page,search]);

const handleStuFees = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  setStudFeesInput((prev) => ({
    ...prev,
    [name]:
      name === "student_id" ||
      name === "fee_structure_id" ||
      name === "amount_paid" ||
      name === "due_amount"
        ? Number(value)
        : value,
  }));
};

  const handleSubmitStudFees = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
   const payload: IStudentFeesInput = {
  student_id: stuFeesInput.student_id,
  fee_structure_id: stuFeesInput.fee_structure_id,
  amount_paid: stuFeesInput.amount_paid,
  due_amount: stuFeesInput.due_amount,
  payment_date: stuFeesInput.payment_date,
  payment_status: stuFeesInput.payment_status,
};
    if(isEdit){
      StudentFeesApiProvider.apolloInstance.updateStudFees(
        Number(id),
        payload,
        (res)=>{
          toast.success("Fees Detailing Updated Successfully");
          router.push("/student-fees");
        },
        (err)=>{
          toast.error(err?.response?.data?.meesage || "Error while updating student Fees details");
        }
      );
    }
    else {
    StudentFeesApiProvider.apolloInstance.createStudentFees(
      payload,
      (res) => {
        toast.success("Student Fees Added Successfully");
        router.push("/student-fees");
      },
      (err) => {
        toast.error("Error while Ading  student fees Details");
      },
    );
  }};

  const  openDeleteModal = (id:number)=>{
    setSelectStudFeeId(id);
    setShowModal(true);
  }


  const closeDeleteModal =()=>{
    setSelectStudFeeId(null);
    setShowModal(false);
  }


  const handleDeleteStudFeeRecord = () =>{
    setLoading(true);
    if(selectStudFeeId === null) return;

    StudentFeesApiProvider.apolloInstance.deleteStudFees(
      selectStudFeeId,
      (res)=>{
        toast.success("Student Fees Record Deleted Successfully");
        setStuFeesData((prev)=>prev.filter((it)=>it.id !== selectStudFeeId));
        closeDeleteModal();
      },
      (err)=>{
        toast.error( err?.response?.data?.meesage || "Error while Deleting Student Record");
      }
    )
  }


  const fetchStudentFeesDetailById = ()=>{
    if(!id) return;

    StudentFeesApiProvider.apolloInstance.getStuFeesById(
      Number(id),
      (res)=>{
        setStudFeesDetails(res.data);
        setStudFeesInput({
          student_id:res.data.student_id,
          amount_paid:res.data.amount_paid,
          due_amount:res.data.due_amount,
          fee_structure_id:res.data.fee_structure_id,
          payment_date: res.data.payment_date?.split("T")[0] || "",
          payment_status:res.data.payment_status ??  "Partial"
        });
      },
      (err)=>{
        console.log(err);
        toast.error("Erorr in fetch student Fees");
      }
    )
  }

  useEffect(()=>{
    fetchStudentFeesDetailById();
  },[id]);


  const handleSearch=()=>{
    setPage(1);
    setSearch(searchInput);

  }


  return {
    stuFeesInput,
    handleStuFees,
    handleSubmitStudFees,
    studFeesData,
    router,
    handleDeleteStudFeeRecord,
    openDeleteModal,
    closeDeleteModal,
    loading,
    showModal,
    search,
    setSearch,
    searchInput,
    setSearchInput,
    totalPages,
    totalRecords,
    page,
    setPage,
    limit,
    handleSearch,
    studFeesDetails
  };
};
