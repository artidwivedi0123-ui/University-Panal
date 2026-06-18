"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import Table from "@/src/components/Table/Table";
import { useStudentDetailsState } from "./useStudentDetailsState";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import { withAdmin } from "@/src/hoc/withAdminHoc";

const  StudentDetailsPage= ()=>{
    const  {
        studentDetail,
        router,
        totalPages,
        page,
        setPage,
        searchInput,
        setSearchInput,
        handleSearch,
        totalRecordStudDet
    } =
    useStudentDetailsState();

    return (
        <MainLayout>
          <Table 
           data={studentDetail}
           type={UNIVERSITY_SECTION_TYPE.STUDENTDETAIL}
           search={searchInput}
           setSearch={setSearchInput}
           currentPage={page}
           setCurrentPage={setPage}
           totalPages={totalPages}
           totalRecords={totalRecordStudDet}
           addBtn={()=>router.push("/add-studetail")}
           >
          </Table>
        </MainLayout>
    )
};
export default withAdmin(StudentDetailsPage);