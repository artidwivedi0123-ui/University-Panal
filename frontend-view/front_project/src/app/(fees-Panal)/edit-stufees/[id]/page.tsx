"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { UseFeesStructState } from "@/src/app/(fees-Panal)/fee-structure/useFeesStructState"
import Form from "@/src/components/Form/Form";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import { useStudentFeesState } from "@/src/app/(fees-Panal)/student-fees/useStudentFeesState";
import { useStudentsState } from "@/src/app/(university-Panal)/students/useStudentsState";

export default function  EditStudentPage(){
    const {handleStuFees,
        handleSubmitStudFees,
        stuFeesInput
    } = useStudentFeesState();
    const {students}= useStudentsState();
    const {feesStruct} = UseFeesStructState();
 
    return (
        <MainLayout>
            <Form
            formData={stuFeesInput}
            handleChange={handleStuFees}
            onSubmit={handleSubmitStudFees}
            type={UNIVERSITY_SECTION_TYPE.STUDENTFEES}
            students={students}
            feeStructure={feesStruct}
            />
        </MainLayout>
    )
}