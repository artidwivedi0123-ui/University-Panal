"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { UseStudentProfileState } from "../student-result/useStudentProfileState";
import Image from "next/image";
import { FIcon, MIcon, Students } from "@/src/assets";
import style from "@/src/app/(student-Profile)/student-result/student-profile.module.scss";
import { currencyFormatter, formatDateTime } from "@/src/utils/app.utils";
import DetailCard from "@/src/components/Card/Card";
import { TRANSLATIONSAPPCONSTANTS } from "@/src/constants/translationConstants";
export default function StudentDashboard() {
  const { studentProfile,studentTrans } = UseStudentProfileState();
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
          title={studentTrans(TRANSLATIONSAPPCONSTANTS.STUDENTDASHBOARD)}
          fields={[
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.STUDENTNAME),
              value: studentProfile?.profile?.name ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.ROLLNUMBER),
              value: studentProfile?.profile?.rollNumber ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.GENDER),
              value: studentProfile?.profile?.gender ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.EMAILID),
              value: studentProfile?.profile?.email ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.CONTACTNUMBER),
              value: studentProfile?.profile?.phoneNumber ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.ADDRESSDETAILS),
              value: studentProfile?.profile?.address ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.CITY),
              value: studentProfile?.profile?.city ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.STATE),
              value: studentProfile?.profile?.state ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.COUNTRY),
              value: studentProfile?.profile?.country ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.FATHERNAME),
              value: studentProfile?.profile?.fatherName ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.MOTHERNAME),
              value: studentProfile?.profile?.motherName ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.STUDENTPREVIOUSSCHOOL),
              value: studentProfile?.profile?.previousSchool ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.STUDENTPREVIOUSCOLLEGE),
              value: studentProfile?.profile?.previousCollege ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.STUDENTPREVIOUSEDUCATIONFIELD),
              value: studentProfile?.profile?.previousStudyField ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.COURSE),
              value: studentProfile?.profile?.course ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.SUBJECTS),
              value: studentProfile?.subjects
                .map((it) => it.subject_name)
                .join(" , ") ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.COURSETYPE),
              value: studentProfile?.profile?.course_type ?? ""
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.AMOUNTPAID),
              value: currencyFormatter(studentProfile?.fees?.amount_paid),
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.DUEAMOUNTFEES),
              value: currencyFormatter(studentProfile?.fees?.due_amount),
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.DATEOFPAYEMENT),
              value: formatDateTime(studentProfile?.fees?.payment_date),
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.STATUSOFPAYMENT),
              value: studentProfile?.fees?.payment_status ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.MARKSOBTAINED),
              value: studentProfile?.results?.marks ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.GRADEPOINTS),
              value: studentProfile?.results?.grade_points ?? "",
            },
            {
              label: studentTrans(TRANSLATIONSAPPCONSTANTS.RESULT),
              value: studentProfile?.results?.result ?? "",
            },
          ]}
        />
      </div>
    </MainLayout>
  );
}
