"use client";

import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import Dashboard from "@/src/components/Dashboard/Dashboard";
import { UseFeesStructState } from "../fee-structure/useFeesStructState";
import { FeesDash, StuDash } from "@/src/assets";
import { currencyFormatter } from "@/src/utils/app.utils";
import { withAdmin } from "@/src/hoc/withAdminHoc";

const FeesDashboard=() =>{
  const { feesDashboard } = UseFeesStructState();
  const cards = [
    {
      title: "Total Fee Structure",
      count: `${currencyFormatter(Number(feesDashboard?.totalFee))}`,
      image: FeesDash,
      fees: [],
    },

    ...(feesDashboard?.courses.map((course) => ({
      title: course.course_name,
      count: `${currencyFormatter(Number(course.total_fee))}`,
      image: FeesDash,
      fees: [
        `Tuition Fee : ${currencyFormatter(Number(course.tuition_fee))}`,
        `Exam Fee : ${currencyFormatter(Number(course.exam_fee))}`,
        `Library Fee : ${currencyFormatter(Number(course.library_fee))}`,
        `Other Fee : ${currencyFormatter(Number(course.other_fee))}`,
      ],
    })) || [])
  ];

  return (
    <MainLayout>
      <h3>Fees Structure</h3>
      <Dashboard cards={cards} />
    </MainLayout>
  );
};
export default  withAdmin(FeesDashboard);