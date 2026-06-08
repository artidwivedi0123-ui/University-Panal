"use client";

import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import Dashboard from "@/src/components/Dashboard/Dashboard";
import { useStudentsState } from "../students/useStudentsState";
import { StuDash } from "@/src/assets";
import { getOrdinal } from "@/src/utils/app.utils";

export default function SubjectDashPage() {

 const {stuDashboard,totalStudents,
  courses,
 } = useStudentsState();

 const cards = [
  {
    title: "Total Students",
    count: totalStudents,
    students:courses.map((s)=> `${s.courseName} (${s.totalStudents})`),
     image: StuDash,
   
  },

  ...stuDashboard.map((item) => ({
    title: `${item.course_name} [${item.course_type}]
            - Semester :) ${getOrdinal(item.semester_number)}`,
    count: item.total_students,
    students: item.students,
    image: StuDash,
  }))
];

  
  return (
    <MainLayout>
      <Dashboard
        title="Student Dashboard"
        cards={cards}
      />
    </MainLayout>
  );
}