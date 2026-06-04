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
import { useCoursesState } from "@/src/app/(university-Panal)/courses/useCoursesState";
import { UseSemesterState } from "@/src/app/(university-Panal)/semesters/useSemesterState";

export default function EditStudentsPage() {

  const {
   subjectData,
   handleChangeSubject,
   handleSubmitSubjects,
  } = UseSubjectState();
  const {course} = useCoursesState();
  const {semester} = UseSemesterState();

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
}