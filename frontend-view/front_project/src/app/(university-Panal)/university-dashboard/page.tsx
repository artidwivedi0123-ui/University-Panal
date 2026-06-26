"use client";

import Dashboard from "@/src/components/Dashboard/Dashboard";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import style from  "@/src/components/Dashboard/dashboard.module.scss";
import { useStudentsState } from "../students/useStudentsState";
import { UseSubjectState } from "../subjects/useSubjectState";
import { UseSemesterState } from "../semesters/useSemesterState";
import { useCoursesState } from "../courses/useCoursesState";
import { UseDashboard } from "@/src/components/Dashboard/useDashboardState";
import { withAdmin } from "@/src/hoc/withAdminHoc";
import { TRANSLATIONSAPPCONSTANTS } from "@/src/constants/translationConstants";
import UniversityChartBar from "@/src/components/ReusableChartComponent/universityChartBar";
const UniversityDashboardPage = () => {
  const { totalRecordStu } = useStudentsState();
  const { totalRecords } = UseSubjectState();
  const { semester } = UseSemesterState();
  const { course } = useCoursesState();
  const { dashboardDetails,dashTrans } = UseDashboard({
    studentsCount: totalRecordStu || 0,
    subjectsCount: totalRecords || 0,
    semesterCount: semester?.length || 0,
    courseCount: course?.length || 0,
  });

  return (
    <MainLayout>
          <h2 className={style["dashb-heading"]}>{dashTrans(TRANSLATIONSAPPCONSTANTS.SUMMARY)}</h2>
      <UniversityChartBar
      dash={dashboardDetails}
      />
      <Dashboard cards={dashboardDetails} />
    </MainLayout>
  );
};

export default withAdmin(UniversityDashboardPage);
