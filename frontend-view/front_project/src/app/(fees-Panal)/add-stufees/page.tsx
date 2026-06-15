"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { UseFeesStructState } from "../fee-structure/useFeesStructState"
import Form from "@/src/components/Form/Form";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import { useStudentFeesState } from "../student-fees/useStudentFeesState";
import { useStudentsState } from "../../(university-Panal)/students/useStudentsState";

export default function AddStudentFeesPage(){
    const {handleStuFees,
        handleSubmitStudFees,
        stuFeesInput
    } = useStudentFeesState();
    const {allStudData}= useStudentsState();
    const {feesStruct} = UseFeesStructState();

    // console.log(" Check semester",semester);
 
    return (
        <MainLayout>
            <Form
            formData={stuFeesInput}
            handleChange={handleStuFees}
            onSubmit={handleSubmitStudFees}
            type={UNIVERSITY_SECTION_TYPE.STUDENTFEES}
            students={allStudData}
            feeStructure={feesStruct}

            />
        </MainLayout>
    )
}