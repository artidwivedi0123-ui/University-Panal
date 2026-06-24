"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { UseStudentProfileState } from "../student-result/useStudentProfileState";
import Image from "next/image";
import { FIcon, MIcon, Students } from "@/src/assets";
import {
  currencyFormatter,
  formatDateTime,
  getOrdinal,
} from "@/src/utils/app.utils";
import style from "@/src/app/(student-Profile)/student-result/student-profile.module.scss";
import { TRANSLATIONSAPPCONSTANTS } from "@/src/constants/translationConstants";
export default function StudentFees() {
  const { studentProfile,studentTrans } = UseStudentProfileState();
  return (
    <MainLayout>
      <div className={style["table-container"]}>
        <h3 className={style["heading"]}>{studentTrans(TRANSLATIONSAPPCONSTANTS.STUDENTFEESDETAILING)}</h3>

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

        <table className={style["table"]}>
          <tbody>
            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.STUDENTNAME)}</th>
              <td>{studentProfile?.profile?.name}</td>
            </tr>

            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.ROLLNUMBER)}</th>
              <td>{studentProfile?.profile?.rollNumber}</td>
            </tr>

            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.COURSE)}</th>
              <td>{studentProfile?.profile?.course}</td>
            </tr>

            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.SEMESTER)}</th>
              <td>{getOrdinal(studentProfile?.profile?.semester)}</td>
            </tr>

            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.AMOUNTPAID)}</th>
              <td>{currencyFormatter(studentProfile?.fees.amount_paid)}</td>
            </tr>
            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.DUEAMOUNTFEES)}</th>
              <td>{currencyFormatter(studentProfile?.fees?.due_amount)}</td>
            </tr>
            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.DATEOFPAYEMENT)}</th>
              <td>{formatDateTime(studentProfile?.fees?.payment_date)}</td>
            </tr>
            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.STATUSOFPAYMENT)}</th>
              <td>{studentProfile?.fees?.payment_status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
