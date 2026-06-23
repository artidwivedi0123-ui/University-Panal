"use client";
import Form from "@/src/components/Form/Form";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { UseFeesStructState } from "../../fee-structure/useFeesStructState";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import { useCourseList } from "@/src/hooks/useCourselistState";
import { useSemesterList } from "@/src/hooks/useSemesterListState";
import { withAdmin } from "@/src/hoc/withAdminHoc";
const EditFees = () => {
  const { feesData, handleChangeFees, handleSubmit } = UseFeesStructState();
  const { course } = useCourseList();
  const { semester } = useSemesterList();
  return (
    <MainLayout>
      <Form
        formData={feesData}
        handleChange={handleChangeFees}
        onSubmit={handleSubmit}
        type={UNIVERSITY_SECTION_TYPE.FEESTRUCTURE}
        course={course}
        semester={semester}
      />
    </MainLayout>
  );
};
export default withAdmin(EditFees);
