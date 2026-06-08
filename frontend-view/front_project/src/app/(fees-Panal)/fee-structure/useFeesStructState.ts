import {
    IFeesDetailsById,
  IFeeStructureData,
  IFeeStructureInput,
} from "@/src/modules/fees/modal/IFees";
import { FeesApiProvider } from "@/src/modules/fees/provider/fees.provider";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UseFeesStructState = () => {
  const params = useParams();
  const id = params?.id as string;
  const isEdit = !!id;
  const [feesDetails,setFeesDetails]= useState<IFeesDetailsById | null>(null);
  const [fees, setFees] = useState<IFeeStructureData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page,setPage]= useState<number>(1);
  const [search,setSearch]= useState<string>("");
  const [totalPages,setTotalPages]= useState<number>(0);
  const [searchInput,setSearchInput] = useState<string>("");
  const [limit,setLimit] = useState<number>(10);
  const [showModal,setShowModal] = useState<boolean>(false);
  const [totalRecords,setTotalRecords] = useState<number>(0);
  const [selectedFeesId,setSelecteFeesId] = useState<number | null>(null);
  const [feesData, setFeesData] = useState<IFeeStructureInput>({
    course_id: 0,
    semester_id: 0,
    tuition_fee: "" as any,
    exam_fee: "" as any,
    library_fee: "" as any,
    other_fee: "" as any,
  });
  const router = useRouter();
  const fetchFees = () => {
    setLoading(true);
    FeesApiProvider.apolloInstance.getFees(
      page,
      limit,
      search,
      (res) => {
        setLoading(false);
        setFees(res?.data);
        console.log("Response for the Fees",res.data);
        setTotalPages(res.pagination.totalPage);
        setTotalRecords(res.pagination.totalRecords);
      },
      (err) => {
        setLoading(false);
        console.error(err);
      },
    );
  };

  useEffect(() => {
    fetchFees();
  }, [page,search,limit]);

 const handleChangeFees = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement
  >
) => {
  const { name, value } = e.target;
  setFeesData((prev) => ({
    ...prev,
    [name]:
      name === "course_id" ||
      name === "semester_id" ||
      name.includes("_fee")
        ? Number(value)
        : value,
  }));
};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: IFeeStructureInput = {
      course_id: feesData.course_id,
      semester_id: feesData.semester_id,
      tuition_fee: feesData.tuition_fee,
      exam_fee: feesData.exam_fee,
      library_fee: feesData.library_fee,
      other_fee: feesData.other_fee,
    };

    if (isEdit) {
      FeesApiProvider.apolloInstance.updateFees(
        Number(id),
        payload,
        (res) => {
          toast.success("Fees Details Updated Successfully");
          router.push("/fee-structure");
          console.log()
        },
        (err) => {
          toast.error(err?.response?.data?.message);
        },
      );
    } else {
      FeesApiProvider.apolloInstance.createFees(
        payload,
        (res) => {
          toast.success("Fees Added Successfully");
          router.push("/fee-structure");
        },
        (err) => {
          toast.error(
            err?.response?.data?.meesage || "Error while adding Fees",
          );
        },
      );
    }
  };

  const fetchFeesById = () =>{
    if(!id) return ;

    FeesApiProvider.apolloInstance.getFeesById(
        Number(id),
        (res)=>{
            setFeesDetails(res.data);
        setFeesData({
            course_id:res.data.course_id,
            semester_id:res.data.semester_id,
            exam_fee:res.data.exam_fee,
            library_fee:res.data.library_fee,
            other_fee:res.data.other_fee,
            tuition_fee:res.data.tuition_fee,
        });
        }, 
        (err)=>{
            console.log(err);
            toast.error("Error in fetch error");
        }
    )
  }

  useEffect(()=>{
    fetchFeesById();
  },[id]);


 const handleSearch = () => {
  setPage(1);
  setSearch(searchInput);
};


  const openDeleteModal = (id:number)=>{
    setSelecteFeesId(id);
    setShowModal(true);
  };

const  closeDeleteModal =() =>
{
  setSelecteFeesId(null);
  setShowModal(false);
}



const handleDeleteFeesRecord = ()=>{
  setLoading(true);
  if(selectedFeesId === null) return;

  FeesApiProvider.apolloInstance.deleteFees(
    selectedFeesId,
    (res)=>{
      setLoading(false);
      setFees((prev)=>prev.filter((it)=>it.id !== selectedFeesId));
      toast.success("Fees Record Deleted Successfully");
      closeDeleteModal();
    },
    (err)=>{
      setLoading(false);
      toast.error(err?.response?.data?.meesage || "Error while deleting Fees Record");
    }
  )
}

  return {
    feesData,
    feesStruct: fees,
    setLoading,
    feesDetails,
    handleChangeFees,
    handleSubmit,
    loading,
    router,
    handleDeleteFeesRecord,
    openDeleteModal,
    showModal,
    closeDeleteModal,
    page,
    setPage,
    search,
    setLimit,
    limit,
    searchInput,
    setSearch,
    setSearchInput,
    totalPages,
    totalRecords,
    handleSearch


  };
};
