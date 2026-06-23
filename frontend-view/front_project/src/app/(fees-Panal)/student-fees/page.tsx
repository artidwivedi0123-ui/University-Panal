"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import Table from "@/src/components/Table/Table";
import { useStudentFeesState } from "./useStudentFeesState";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import ModalBox from "@/src/components/Modal/Modal";

import { withAdmin } from "@/src/hoc/withAdminHoc";

const StudentFeesPage = () => {
  const {
    studFeesData,
    router,
    showModal,
    handleDeleteStudFeeRecord,
    openDeleteModal,
    closeDeleteModal,
    totalPages,
    totalRecords,
    page,
    setPage,
    searchInput,
    setSearchInput,
    handleSearch,
  } = useStudentFeesState();
  return (
    <>
      <MainLayout>
        <Table
          data={studFeesData}
          type={UNIVERSITY_SECTION_TYPE.STUDENTFEES}
          addBtn={() => router.push("/add-stufees")}
          openDeleteModal={openDeleteModal}
          handleEdit={(id) => router.push(`/edit-stufees/${id}`)}
          search={searchInput}
          currentPage={page}
          setCurrentPage={setPage}
          setSearch={setSearchInput}
          onSearch={handleSearch}
          totalPages={totalPages}
          totalRecords={totalRecords}
        />
        {showModal && (
          <ModalBox
            confirmText="Delete"
            message="Are you really  want to  delete  Student Fees Record"
            onCancel={closeDeleteModal}
            onConfirm={handleDeleteStudFeeRecord}
            title="Delete  Student Fees Record"
          />
        )}
      </MainLayout>
    </>
  );
};
export default withAdmin(StudentFeesPage);
