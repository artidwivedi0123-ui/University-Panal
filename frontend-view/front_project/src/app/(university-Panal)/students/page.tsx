"use client";

import Table from "@/src/components/Table/Table";
import { useStudentsState } from "./useStudentsState";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import ModalBox from "@/src/components/Modal/Modal";
import { withAdmin } from "@/src/hoc/withAdminHoc";

const StudentsPage = () => {
  const {
    students,
    router,
    handleDeleteStudent,
    showModal,
    closeDeleteModal,
    openDeleteModal,
    totalPages,
    page,
    setPage,
    searchInput,
    setSearchInput,
    handleSearch,
    totalRecordStu,
  } = useStudentsState();
  return (
    <>
      <MainLayout>
        <Table
          data={students}
          type={UNIVERSITY_SECTION_TYPE.STUDENTS}
          search={searchInput}
          setSearch={setSearchInput}
          currentPage={page}
          setCurrentPage={setPage}
          totalPages={totalPages}
          onSearch={handleSearch}
          totalRecords={totalRecordStu}
          addBtn={() => router.push("/add-student")}
          openDeleteModal={openDeleteModal}
          handleEdit={(id) => router.push(`/edit-student/${id}`)}
          viewDetails={(id) => router.push(`/view-student/${id}`)}
        />

        {showModal && (
          <ModalBox
            confirmText="Delete"
            message="Are you really  want to  delete Student 's Details"
            onCancel={closeDeleteModal}
            title="Delete  University  Students"
            onConfirm={handleDeleteStudent}
          />
        )}
      </MainLayout>
    </>
  );
};
export default withAdmin(StudentsPage);
