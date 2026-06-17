"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import Table from "@/src/components/Table/Table";
import { UseFeesStructState } from "./useFeesStructState";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import ModalBox from "@/src/components/Modal/Modal";
import { withAdmin } from "@/src/hoc/withAdminHoc";

const FeeStructureFees = () => {
  const {
    feesStruct,
    router,
    handleDeleteFeesRecord,
    showModal,
    totalPages,
    page,
    setPage,
    searchInput,
    setSearchInput,
    handleSearch,
    totalRecords,
    openDeleteModal,
    closeDeleteModal,
  } = UseFeesStructState();
  console.log("Structure Data", feesStruct);
  return (
    <MainLayout>
      <Table
        data={feesStruct}
        type={UNIVERSITY_SECTION_TYPE.FEESTRUCTURE}
        addBtn={() => router.push("/add-fees")}
        handleEdit={(id) => {
          console.log("Fees Id", id);
          router.push(`/edit-fees/${id}`);
        }}
        handleDelete={handleDeleteFeesRecord}
        openDeleteModal={openDeleteModal}
        search={searchInput}
        setCurrentPage={setPage}
        setSearch={setSearchInput}
        currentPage={page}
        totalPages={totalPages}
        onSearch={handleSearch}
        totalRecords={totalRecords}
      />
      {showModal && (
        <ModalBox
          confirmText="Delete"
          message="Are you really  want to  delete  this Fees Record"
          onCancel={closeDeleteModal}
          onConfirm={handleDeleteFeesRecord}
          title="Delete Fees Record"
        />
      )}{" "}
      {showModal && (
        <ModalBox
          confirmText="Delete"
          message="Are you really  want to  delete  this Fees Record"
          onCancel={closeDeleteModal}
          onConfirm={handleDeleteFeesRecord}
          title="Delte Fees Record"
        />
      )}
    </MainLayout>
  );
};
export default withAdmin(FeeStructureFees);
