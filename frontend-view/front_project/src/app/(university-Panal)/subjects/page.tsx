"use client";
import Table from "@/src/components/Table/Table";
import { UseSubjectState } from "./useSubjectState";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import ModalBox from "@/src/components/Modal/Modal";

import { withAdmin } from "@/src/hoc/withAdminHoc";

const SubjectsPage=()=>{
    const {subjects,router,openDeleteModal,handleDeleteSubject,showModal,closeDeleteModal,totalRecords,
        page,handleSearch,searchInput,setSearchInput,setPage,totalPages
    } = UseSubjectState();
     return (
        <>
        <MainLayout>
            <Table
         data={subjects}
         type={UNIVERSITY_SECTION_TYPE.SUBJECTS}
         addBtn={()=>router.push('/add-subject')}
         openDeleteModal={openDeleteModal}
         handleDelete={handleDeleteSubject}
         handleEdit={(id)=>router.push(`/edit-subject/${id}`)}
         viewDetails={(id)=>router.push(`/view-subject/${id}`)}
         totalRecords={totalRecords}
         currentPage={page}
         setCurrentPage={setPage}
         onSearch={handleSearch}
         totalPages={totalPages}
         setSearch={setSearchInput}
         search={searchInput}
         />
        {showModal && (
            <ModalBox 
            confirmText="Delete"
            message="Are you really want  to  delete Subject"
            onCancel={closeDeleteModal}
            title="Delete  University  Subject"
            onConfirm={handleDeleteSubject}
            />
        )}

        </MainLayout>
        
        </>
    )
};

export default  withAdmin(SubjectsPage);