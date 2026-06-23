"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import Form from "@/src/components/Form/Form";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import { useStudentsState } from "../students/useStudentsState";
import { useCourseList } from "@/src/hooks/useCourselistState";
import { useSemesterList } from "@/src/hooks/useSemesterListState";
import { withAdmin } from "@/src/hoc/withAdminHoc";
const AddStudentsPage = () => {
  const { studentData, handleChangeStudent, handleSubmitStudent } =
    useStudentsState();
  const { course } = useCourseList();
  const { semester } = useSemesterList();
  return (
    <MainLayout>
      <Form
        formData={studentData}
        handleChange={handleChangeStudent}
        onSubmit={handleSubmitStudent}
        type={UNIVERSITY_SECTION_TYPE.STUDENTS}
        course={course}
        semester={semester}
      />
    </MainLayout>
  );
};
export default withAdmin(AddStudentsPage);
