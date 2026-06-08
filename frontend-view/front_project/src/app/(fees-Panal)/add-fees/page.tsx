"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { UseFeesStructState } from "../fee-structure/useFeesStructState"
import Form from "@/src/components/Form/Form";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import { useCoursesState } from "../../(university-Panal)/courses/useCoursesState";
import { UseSemesterState } from "../../(university-Panal)/semesters/useSemesterState";

export default function AddFeesPage(){
    const {feesStruct,
        feesData
        ,handleChangeFees,
        handleSubmit
    } = UseFeesStructState();
    const {course} = useCoursesState();
    const {semester} = UseSemesterState();
    // console.log(" Check semester",semester);
 
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