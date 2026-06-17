"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { UseFeesStructState } from "../fee-structure/useFeesStructState"
import Form from "@/src/components/Form/Form";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import { useStudentFeesState } from "../student-fees/useStudentFeesState";
import { useStudentsState } from "../../(university-Panal)/students/useStudentsState";
import { withAdmin } from "@/src/hoc/withAdminHoc";

 const AddStudentFeesPage=()=>{
    const {handleStuFees,
        handleSubmitStudFees,
        stuFeesInput
    } = useStudentFeesState();
    const {allStudData,students}= useStudentsState();
    const {feesStruct} = UseFeesStructState();

    // console.log(" Check semester",semester);

    console.log("Fees Structure",feesStruct);
 
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
};
export default withAdmin(AddStudentFeesPage);