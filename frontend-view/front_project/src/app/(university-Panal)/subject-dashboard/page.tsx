"use client";

import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import Dashboard from "@/src/components/Dashboard/Dashboard";
import { UseSubjectState } from "../subjects/useSubjectState";
import { DashboardImg, SubDash } from "@/src/assets";
import SemesterBarChart from "@/src/components/ReusableChartComponent/SemesterChartBar";
import CourseBarChart from "@/src/components/ReusableChartComponent/ChartCourseBar";
import { getOrdinal } from "@/src/utils/app.utils";
import style from "@/src/app/(university-Panal)/subject-dashboard/subject-dash.module.scss";
import Image from "next/image";

export default function SubjectDashPage() {
  const { subDashboard, totalSubjects, courses } = UseSubjectState();

  const cards = [
    {
      title: "Total Subjects",
      count: totalSubjects,
      subjects: courses.map((c) => `${c.courseName} (${c.totalSubjects})`),
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
      <div className={style["container"]}>
        <Image 
        src={SubDash}
        alt="subjects"
        height={60}
        width={60}
        loading={"eager"}
        />
        <h2 className={style["container-heading"]}>
          Analysis  Subjects with Courses and Respective Semester 
        </h2>
      </div>
      <CourseBarChart courses={courses}/>
      <SemesterBarChart semesters={subDashboard} />
      <Dashboard title="Subject Summary" cards={cards} />
    </MainLayout>
  );
}
