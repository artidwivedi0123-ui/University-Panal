"use client";
import Form from "@/src/components/Form/Form";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { useCoursesState } from "../courses/useCoursesState";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import { withAdmin } from "@/src/hoc/withAdminHoc";

const AddCourse = () => {
  const { courseData, handleChangeCourse, handleSubmitCourse } =
    useCoursesState();
  return (
    <MainLayout>
      <Form
        formData={courseData}
        handleChange={handleChangeCourse}
        onSubmit={handleSubmitCourse}
        type={UNIVERSITY_SECTION_TYPE.COURSES}
      />
    </MainLayout>
  );
};
export default withAdmin(AddCourse);
