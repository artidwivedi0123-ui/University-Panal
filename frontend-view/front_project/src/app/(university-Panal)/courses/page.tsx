"use client";
import { useCoursesState } from "@/src/app/(university-Panal)/courses/useCoursesState";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import Card from "@/src/components/CardContainer/CardContainer";
import style from "@/src/app/(university-Panal)/courses/course.module.scss";
import { useTranslations } from "next-intl";
import { TRANSLATIONSAPPCONSTANTS } from "@/src/constants/translationConstants";
export default function CoursePage() {
  const { course } = useCoursesState();
  const courseTrans = useTranslations(TRANSLATIONSAPPCONSTANTS.UNIVERSITYTABLE);
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
                  label: courseTrans(TRANSLATIONSAPPCONSTANTS.COURSETYPE),
                  value: item.course_type,
                },
                {
                  label: courseTrans(TRANSLATIONSAPPCONSTANTS.TOTALSEM),
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
