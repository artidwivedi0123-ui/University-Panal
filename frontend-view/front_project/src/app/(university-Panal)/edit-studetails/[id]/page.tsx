"use client";

import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { useStudentDetailsState } from "@/src/app/(university-Panal)/student-details/useStudentDetailsState";
import Form from "@/src/components/Form/Form";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import { withAdmin } from "@/src/hoc/withAdminHoc";
import { useStudentList } from "@/src/hooks/useStudentListState";
const EditStudentDetails = () => {
  const {
    handleStudeDetailChange,
    stuDetailInput,
    handleSubmitStudentDetails,
  } = useStudentDetailsState();
  const { student } = useStudentList();
  return (
    <MainLayout>
      <Form
        formData={stuDetailInput}
        handleChange={handleStudeDetailChange}
        onSubmit={handleSubmitStudentDetails}
        type={UNIVERSITY_SECTION_TYPE.STUDENTDETAIL}
        students={student}
      ></Form>
    </MainLayout>
  );
};

export default withAdmin(EditStudentDetails);
