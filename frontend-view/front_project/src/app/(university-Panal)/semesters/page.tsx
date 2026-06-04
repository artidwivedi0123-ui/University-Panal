"use client";
import Table from "@/src/components/Table/Table";
import { UseSemesterState } from "./useSemesterState";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import ModalBox from "@/src/components/Modal/Modal";
import Card from "@/src/components/CardContainer/CardContainer";
import style from "@/src/app/(university-Panal)/semesters/semester.module.scss";

export default function SemesterPage() {
  const {
    semester,
  } = UseSemesterState();
  console.log("check semeseter", semester);
  return (
    <>
      <MainLayout>
    <h2 className={style["heading"]}> Available Semester</h2>
        <div className={style["grid"]}>
      
          {semester.map((item,index) => (
            <Card
  title={`Semester ${item.semester_number}`}
  key={index}
  fields={[
    {
      label: "Course",
      value: item.course_name,
    },
    {
      label: "Type",
      value: item.course_type,
    },
    
  ]}
/>
          ))}
        </div>
        {/* {showModal && (
          <ModalBox
            confirmText="Delete"
            message="Are you really  want to  delete Semester's Details"
            onCancel={closeDeleteModal}
            title="Delete  University  Semester"
            onConfirm={handleDeleteSemester}
          />
        )} */}
      </MainLayout>
    </>
  );
}
