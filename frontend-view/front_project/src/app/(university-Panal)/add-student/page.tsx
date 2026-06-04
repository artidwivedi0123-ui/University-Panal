"use client";

import MainLayout
from "@/src/components/Main-Layout/Layout/Main-layout";

import Form
from "@/src/components/Form/Form";

import {
  UNIVERSITY_SECTION_TYPE,
}
from "@/src/types/university-section.type";

import {
  useStudentsState
}
from "../students/useStudentsState";
import { useCoursesState } from "../courses/useCoursesState";
import { UseSemesterState } from "../semesters/useSemesterState";

export default function AddStudentsPage() {

  const {
    studentData,
    handleChangeStudent,
    handleSubmitStudent,
  } = useStudentsState();
  const {course} = useCoursesState();
  const {semester} = UseSemesterState();

  return (

    <MainLayout>

      <Form
        formData={studentData}
        handleChange={handleChangeStudent}
        onSubmit={handleSubmitStudent}
        type={
          UNIVERSITY_SECTION_TYPE.STUDENTS
        }
        course={course}
        semester={semester}
      />

    </MainLayout>
  );
}