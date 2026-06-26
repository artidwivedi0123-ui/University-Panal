"use client";
import ReusableBarChart from "@/src/components/BarChart/BarChart";
import { ISubjectDashboard } from "@/src/modules/university/subject/modal/ISubject";




interface SemesterSubjectChartBar {
  semesters:ISubjectDashboard[],
}

export default function SemesterBarChart({
  semesters,
}: SemesterSubjectChartBar) {

const semesterChartData = semesters.map((item)=>({
    name:item.courseName,
    value:item.totalSubjects,
}));


  return (
    <ReusableBarChart
      data={semesterChartData}
      barColor="#2c1466ff"
    />
  );
}