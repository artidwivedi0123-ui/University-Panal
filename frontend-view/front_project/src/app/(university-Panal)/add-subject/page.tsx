"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { UseSubjectState } from "../subjects/useSubjectState";
import Form from "@/src/components/Form/Form";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import { useCoursesState } from "../courses/useCoursesState";
import { UseSemesterState } from "../semesters/useSemesterState";

export default function AddSubjectsPage(){
    const {
        handleChangeSubject,
        handleSubmitSubjects,
        router,
        subjectData
     } = UseSubjectState();
     const {course} = useCoursesState();
     const {semester} = UseSemesterState();
     return (
        <MainLayout>
            <Form 
            formData={subjectData}
            handleChange={handleChangeSubject}
            onSubmit={handleSubmitSubjects}
            type={UNIVERSITY_SECTION_TYPE.SUBJECTS}
            course={course}
            semester={semester}
            />
        </MainLayout>
     )
}