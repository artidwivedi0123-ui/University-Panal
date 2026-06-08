"use client";
import Form from "@/src/components/Form/Form";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { UseFeesStructState } from "../../fee-structure/useFeesStructState";
import { useCoursesState } from "@/src/app/(university-Panal)/courses/useCoursesState";
import { UseSemesterState } from "@/src/app/(university-Panal)/semesters/useSemesterState";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";

export default function EditFees (){
    const {feesData,handleChangeFees,handleSubmit} = UseFeesStructState();
    const {course} = useCoursesState();
    const {semester} = UseSemesterState();
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
    )
}