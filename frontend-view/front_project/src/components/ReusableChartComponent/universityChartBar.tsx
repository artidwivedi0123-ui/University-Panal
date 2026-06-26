"use client";

import { useCoursesState } from "@/src/app/(university-Panal)/courses/useCoursesState";
import { UseSemesterState } from "@/src/app/(university-Panal)/semesters/useSemesterState";
import { useStudentsState } from "@/src/app/(university-Panal)/students/useStudentsState";
import { UseSubjectState } from "@/src/app/(university-Panal)/subjects/useSubjectState";
import ReusableBarChart from "@/src/components/BarChart/BarChart";
import { IStudentDashboard } from "@/src/modules/university/student/modal/IStudents";
import { UseDashboard } from "../Dashboard/useDashboardState";
import { withAdmin } from "@/src/hoc/withAdminHoc";
const UniversityChartBar = () => {
  const { totalRecordStu } = useStudentsState();
  const { totalRecords } = UseSubjectState();
  const { semester } = UseSemesterState();
  const { course } = useCoursesState();
  const { dashboardDetails, dashTrans } = UseDashboard({
    studentsCount: totalRecordStu || 0,
    subjectsCount: totalRecords || 0,
    semesterCount: semester?.length || 0,
    courseCount: course?.length || 0,
  });
  const dash = dashboardDetails.map((it) => ({
    name: it.title,
    value: it.count,
  }));
  return <ReusableBarChart data={dash} barColor="#3a1b83ff" />;
};
export default withAdmin(UniversityChartBar);
