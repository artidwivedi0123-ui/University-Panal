"use client";

import ReusableBarChart from "@/src/components/BarChart/BarChart";
import { IStudentDashboard } from "@/src/modules/university/student/modal/IStudents";
import { ICourseSummary } from "@/src/modules/university/subject/modal/ISubject";




interface StudentBarChartProps {
  students: IStudentDashboard[],
}

export default function StudentsBarChart({
  students,
}: StudentBarChartProps) {
const chartData = students.map((item) => ({
  name: item.course_name,
  value: item.total_students,
}));
  return (
    <ReusableBarChart
      data={chartData}
      barColor="#3a1b83ff"

    />
  );
}