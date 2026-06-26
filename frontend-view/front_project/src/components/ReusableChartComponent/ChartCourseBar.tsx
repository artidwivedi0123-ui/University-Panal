"use client";

import ReusableBarChart from "@/src/components/BarChart/BarChart";
import { ICourseSummary } from "@/src/modules/university/subject/modal/ISubject";




interface CourseBarChartProps {
  courses: ICourseSummary[],
}

export default function CourseBarChart({
  courses,

}: CourseBarChartProps) {
const chartData = courses.map((item) => ({
  name: item.courseName,
  value: item.totalSubjects,
}));
  return (
    <ReusableBarChart
      data={chartData}
      barColor="#3a1b83ff"

    />
  );
}