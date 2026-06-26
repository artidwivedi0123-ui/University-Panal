"use client";

import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import Dashboard from "@/src/components/Dashboard/Dashboard";
import { useStudentsState } from "../students/useStudentsState";
import { StuDash } from "@/src/assets";
import { getOrdinal } from "@/src/utils/app.utils";
import { withAdmin } from "@/src/hoc/withAdminHoc";
import StudentsBarChart from "@/src/components/ReusableChartComponent/StudentChartBar";
const StudentDashPage = () => {
  const { stuDashboard, totalStudents, courses } = useStudentsState();

  const cards = [
    {
      title: "Total Students",
      count: totalStudents,
      students: courses.map((s) => `${s.courseName} (${s.totalStudents})`),
      image: StuDash,
    },

    ...stuDashboard.map((item) => ({
      title: `${item.course_name} [${item.course_type}]
            - Semester :) ${getOrdinal(item.semester_number)}`,
      count: item.total_students,
      students: item.students,
      image: StuDash,
    })),
  ];

  return (
    <MainLayout>
      <div>
        <h2>Analysis of Student with Courses</h2>
        <StudentsBarChart
        students={stuDashboard}
        />
      </div>
      <Dashboard title="Student Dashboard" cards={cards} />
    </MainLayout>
  );
};
export default withAdmin(StudentDashPage);
