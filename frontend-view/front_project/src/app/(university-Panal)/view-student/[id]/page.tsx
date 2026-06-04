"use client";

import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import DetailCard from "@/src/components/Card/Card";
import { useStudentsState } from "../../students/useStudentsState";

export default function ViewStudentPage() {
  const {
    studentDetails,
    loading,
  } = useStudentsState();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!studentDetails) {
    return <p>Student Not Found</p>;
  }

  return (
    <MainLayout>
      <DetailCard
        title="Student Details"
        fields={[
          {
            label: "Name",
            value: studentDetails.name,
          },
          {
            label: "Roll Number",
            value: studentDetails.roll_number,
          },
          {
            label: "Gender",
            value: studentDetails.gender,
          },
          {
            label: "Course",
            value: studentDetails.course_id,
          },
          {
            label: "Semester",
            value: studentDetails.semester_id,
          },
          {
            label: "Marks",
            value: studentDetails.marks,
          },
          {
            label: "Grade Points",
            value: studentDetails.grade_points,
          },
          {
            label: "Result",
            value: studentDetails.result,
          },
        ]}
      />
    </MainLayout>
  );
}