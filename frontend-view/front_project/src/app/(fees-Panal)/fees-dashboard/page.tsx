"use client";

import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import Dashboard from "@/src/components/Dashboard/Dashboard";
import { UseFeesStructState } from "../fee-structure/useFeesStructState";
import { FeesDash, StuDash } from "@/src/assets";

export default function FeesDashboard() {
  const { feesDashboard } = UseFeesStructState();
  console.log("Fees Dashboard",feesDashboard);

  const cards = [
    {
      title: "Total Fee Structure",
      count: `₹${feesDashboard?.totalFee || 0}`,
      image: FeesDash,
      fees: [],
    },

    ...(feesDashboard?.courses.map((course) => ({
      title: course.course_name,
      count: `₹${Number(course.total_fee)}`,
      image: FeesDash,
      fees: [
        `Tuition Fee : ₹${course.tuition_fee}`,
        `Exam Fee : ₹${course.exam_fee}`,
        `Library Fee : ₹${course.library_fee}`,
        `Other Fee : ₹${course.other_fee}`,
      ],
    })) || [])
  ];

  return (
    <MainLayout>
      <Dashboard cards={cards} />
    </MainLayout>
  );
}