"use client";

import MainLayout
from "@/src/components/Main-Layout/Layout/Main-layout";

import Form
from "@/src/components/Form/Form";

import {
  UNIVERSITY_SECTION_TYPE,
}
from "@/src/types/university-section.type";

import { UseSubjectState } from "../../subjects/useSubjectState";
import { useCourseList } from "@/src/hooks/useCourselistState";
import { useSemesterList } from "@/src/hooks/useSemesterListState";
import { withAdmin } from "@/src/hoc/withAdminHoc";


const EditSubjectsPage=() =>{
  const {
   subjectData,
   handleChangeSubject,
   handleSubmitSubjects,
  } = UseSubjectState();
  const {course} = useCourseList();
  const {semester} = useSemesterList();

  return (

    <MainLayout>

      <Form
        formData={subjectData}
        handleChange={handleChangeSubject}
        onSubmit={handleSubmitSubjects}
        type={
          UNIVERSITY_SECTION_TYPE.SUBJECTS
        }
        course={course}
        semester={semester}
      />

    </MainLayout>
  );
};
export default withAdmin(EditSubjectsPage);