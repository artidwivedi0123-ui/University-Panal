import { Courses, Semester, Students, Subject } from "@/src/assets";
import { TRANSLATIONSAPPCONSTANTS } from "@/src/constants/translationConstants";
import { useTranslations } from "next-intl";

interface DashboardProps {
  studentsCount: number;
  subjectsCount: number;
  semesterCount: number;
  courseCount: number;
}

export const UseDashboard = ({
  studentsCount,
  subjectsCount,
  semesterCount,
  courseCount,
}: DashboardProps) => {
  const dashTrans  = useTranslations(TRANSLATIONSAPPCONSTANTS.UNIVERSITYADMINDASH);
  const dashboardDetails = [
    {
      title: dashTrans(TRANSLATIONSAPPCONSTANTS.TOTALCOURSE),
      description: dashTrans(TRANSLATIONSAPPCONSTANTS.DESCRIPTIONCOR),
      count: courseCount,
      image: Courses,
    },
    {
      title: dashTrans(TRANSLATIONSAPPCONSTANTS.TOTALSEMESTER),
      description: dashTrans(TRANSLATIONSAPPCONSTANTS.DESCRIPTIONSEM),
      count: semesterCount,
      image: Semester,
    },
    {
      title: dashTrans(TRANSLATIONSAPPCONSTANTS.TOTALSUBJECTS),
      description: dashTrans(TRANSLATIONSAPPCONSTANTS.DESCRIPTIONSUB),
      count: subjectsCount,
      image: Subject,
    },
    {
      title: dashTrans(TRANSLATIONSAPPCONSTANTS.TOTALSTUDENTS),
      description: dashTrans(TRANSLATIONSAPPCONSTANTS.DESCRIPTIONSTU),
      count: studentsCount,
      image: Students,
    },
  ];

  return {
    dashboardDetails,
    dashTrans
  };
};
