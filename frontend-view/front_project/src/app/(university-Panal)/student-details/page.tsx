"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import Table from "@/src/components/Table/Table";
import { useStudentDetailsState } from "./useStudentDetailsState";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import { withAdmin } from "@/src/hoc/withAdminHoc";
import ModalBox from "@/src/components/Modal/Modal";

const StudentDetailsPage = () => {
  const {
    studentDetail,
    router,
    totalPages,
    page,
    setPage,
    searchInput,
    setSearchInput,
    handleSearch,
    totalRecordStudDet,
    handleDeleteSubjectDetails,
    showModal,
    openDeleteModal,
    closeDeleteModal,
  } = useStudentDetailsState();

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
        onSearch={handleSearch}
        addBtn={() => router.push("/add-studetail")}
        openDeleteModal={openDeleteModal}
        handleEdit={(id) => router.push(`/edit-studetails/${id}`)}
        viewDetails={(id) => router.push(`/view-studetails/${id}`)}
      ></Table>

      {showModal && (
        <ModalBox
          confirmText="Delete"
          message="Are you really want to Delete this Student Details"
          onCancel={closeDeleteModal}
          onConfirm={handleDeleteSubjectDetails}
          title="Delete Student Details"
        />
      )}
    </MainLayout>
  );
};
export default withAdmin(StudentDetailsPage);
