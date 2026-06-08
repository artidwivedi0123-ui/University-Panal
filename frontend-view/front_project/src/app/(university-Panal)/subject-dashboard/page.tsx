"use client";

import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import Dashboard from "@/src/components/Dashboard/Dashboard";
import { UseSubjectState } from "../subjects/useSubjectState";
import { DashboardImg, SubDash } from "@/src/assets";
import { getOrdinal } from "@/src/utils/app.utils";

export default function SubjectDashPage() {

  const {
    subDashboard,
    totalSubjects,
    courses
  } = UseSubjectState();

const cards = [
 {
  title: "Total Subjects",
  count: totalSubjects,
  subjects: courses.map(
    (c) => `${c.courseName} (${c.totalSubjects})`
  ),
  image: SubDash,
},

  ...subDashboard.map((item) => ({
    title: `${item.courseName} - Semester :)
    ${getOrdinal(item.semester)}`,
    count: item.totalSubjects,
    subjects: item.subjects,
    image: SubDash,
  })),
];

  
  return (
    <MainLayout>
      <Dashboard
        title="Subject Dashboard"
        cards={cards}
      />
    </MainLayout>
  );
}