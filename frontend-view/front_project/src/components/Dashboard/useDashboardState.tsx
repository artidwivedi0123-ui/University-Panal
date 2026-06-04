import {
  Courses,
  Semester,
  Students,
  Subject,
} from "@/src/assets";

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

  const dashboardDetails = [
    {
      title: "Total Courses",
      description: "Available Courses",
      count: courseCount,
      image: Courses,
    },
    {
      title: "Total Semesters",
      description: "Respective Course Semesters",
      count: semesterCount,
      image: Semester,
    },
    {
      title: "Total Subjects",
      description: "Subjects Across Semesters",
      count: subjectsCount,
      image: Subject,
    },
    {
      title: "Total Students",
      description: "University Students",
      count: studentsCount,
      image: Students,
    },
  ];

  return {
    dashboardDetails,
  };
};