"use client";

import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { useStudentDetailsState } from "../student-details/useStudentDetailsState";
import { useStudentsState } from "../students/useStudentsState";
import Form from "@/src/components/Form/Form";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import { withAdmin } from "@/src/hoc/withAdminHoc";

const AddSudentDetails =()=>{
    const {
        handleStudeDetailChange,
        stuDetailInput,
        handleSubmitStudentDetails
    } = useStudentDetailsState();
    const {allStudData} = useStudentsState();

    return (
        <MainLayout>
            <Form
            formData={stuDetailInput}
            handleChange={handleStudeDetailChange}
            onSubmit={handleSubmitStudentDetails}
            type={UNIVERSITY_SECTION_TYPE.STUDENTDETAIL}
            students={allStudData}
            >
            </Form>
        </MainLayout>
    )
};

export  default withAdmin(AddSudentDetails);