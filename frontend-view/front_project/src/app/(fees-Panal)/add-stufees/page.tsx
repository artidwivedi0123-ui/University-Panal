"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import Form from "@/src/components/Form/Form";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import { useStudentFeesState } from "../student-fees/useStudentFeesState";
import { useStudentsState } from "../../(university-Panal)/students/useStudentsState";
import { withAdmin } from "@/src/hoc/withAdminHoc";
import { useFeesStructList } from "@/src/hooks/useFeesStructureState";
import { useStudentList } from "@/src/hooks/useStudentListState";

const AddStudentFeesPage = () => {
  const { handleStuFees, handleSubmitStudFees, stuFeesInput } =
    useStudentFeesState();
  const { student } = useStudentList();
  const { fees } = useFeesStructList();

  return (
    <MainLayout>
      <Form
        formData={stuFeesInput}
        handleChange={handleStuFees}
        onSubmit={handleSubmitStudFees}
        type={UNIVERSITY_SECTION_TYPE.STUDENTFEES}
        students={student}
        feeStructure={fees}
      />
    </MainLayout>
  );
};
export default withAdmin(AddStudentFeesPage);
