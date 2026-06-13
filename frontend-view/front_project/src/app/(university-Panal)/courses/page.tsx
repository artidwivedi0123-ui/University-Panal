"use client";
import { useCoursesState } from "@/src/app/(university-Panal)/courses/useCoursesState";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import Card from "@/src/components/CardContainer/CardContainer";
import style from "@/src/app/(university-Panal)/courses/course.module.scss";

export default function CoursePage() {
  const { course } = useCoursesState();
  console.log("courses",course);
  return (
    <>
      <MainLayout>
        <h2 className={style["heading"]}>Available Courses</h2>
        <div className={style.grid}>
          {course?.map((item, index) => (
            <Card
              title={item.course_name}
              key={index}
              fields={[
                {
                  label: "Course Type",
                  value: item.course_type,
                },
                {
                  label: "Total Semester",
                  value: item.total_semesters,
                },
              ]}
            />
          ))}
        </div>
      </MainLayout>
    </>
  );
}
