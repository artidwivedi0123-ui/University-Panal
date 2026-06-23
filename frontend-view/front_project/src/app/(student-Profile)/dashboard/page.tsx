"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { UseStudentProfileState } from "../student-result/useStudentProfileState";
import Image from "next/image";
import { FIcon, MIcon, Students } from "@/src/assets";
import style from "@/src/app/(student-Profile)/student-result/student-profile.module.scss";
import { currencyFormatter, formatDateTime } from "@/src/utils/app.utils";
import DetailCard from "@/src/components/Card/Card";
export default function StudentDashboard() {
  const { studentProfile } = UseStudentProfileState();
  return (
    <MainLayout>
      <div className={style["table-container"]}>
        <h3 className={style["heading"]}>Student' Profile Card</h3>
        <div className={style["profile-image"]}>
          <Image
            src={
              studentProfile?.profile?.gender === "F"
                ? FIcon
                : studentProfile?.profile?.gender === "M"
                  ? MIcon
                  : Students
            }
            width={80}
            height={80}
            alt="profile"
          />
        </div>

        <DetailCard
          title="Student Dashboard"
          fields={[
            {
              label: "Name",
              value: studentProfile?.profile?.name ?? "",
            },
            {
              label: "Roll Number",
              value: studentProfile?.profile?.rollNumber ?? "",
            },
            {
              label: "Gender",
              value: studentProfile?.profile?.gender ?? "",
            },
            {
              label: "Email Id",
              value: studentProfile?.profile?.email ?? "",
            },
            {
              label: "Contact Number",
              value: studentProfile?.profile?.phoneNumber ?? "",
            },
            {
              label: "Address Details",
              value: studentProfile?.profile?.address ?? "",
            },
            {
              label: "City",
              value: studentProfile?.profile?.city ?? "",
            },
            {
              label: "State",
              value: studentProfile?.profile?.state ?? "",
            },
            {
              label: "Country",
              value: studentProfile?.profile?.country ?? "",
            },
            {
              label: "Father Name",
              value: studentProfile?.profile?.fatherName ?? "",
            },
            {
              label: "Mother Name",
              value: studentProfile?.profile?.motherName ?? "",
            },
            {
              label: "Student Previous School",
              value: studentProfile?.profile?.previousSchool ?? "",
            },
            {
              label: "Student Previous College",
              value: studentProfile?.profile?.previousCollege ?? "",
            },
            {
              label: "Student Previous Education Field",
              value: studentProfile?.profile?.previousStudyField ?? "",
            },
            {
              label: "Course",
              value: studentProfile?.profile?.course ?? "",
            },
            {
              label: "Subjects",
              value: studentProfile?.subjects
                .map((it) => it.subject_name)
                .join(" , ") ?? "",
            },
            {
              label: "Course Category",
              value: studentProfile?.profile?.course_type ?? ""
            },
            {
              label: "Amount Paid",
              value: currencyFormatter(studentProfile?.fees?.amount_paid),
            },
            {
              label: "Due Amount Fees",
              value: currencyFormatter(studentProfile?.fees?.due_amount),
            },
            {
              label: "Date of  the Payment",
              value: formatDateTime(studentProfile?.fees?.payment_date),
            },
            {
              label: "Status of Payment",
              value: studentProfile?.fees?.payment_status ?? "",
            },
            {
              label: "Marks Obtained",
              value: studentProfile?.results?.marks ?? "",
            },
            {
              label: "Grade Points",
              value: studentProfile?.results?.grade_points ?? "",
            },
            {
              label: "Result",
              value: studentProfile?.results?.result ?? "",
            },
          ]}
        />
      </div>
    </MainLayout>
  );
}
