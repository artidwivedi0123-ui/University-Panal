"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { UseStudentProfileState } from "./useStudentProfileState";
import Image from "next/image";
import { FIcon, MIcon, Students } from "@/src/assets";
import { getOrdinal } from "@/src/utils/app.utils";
import style from "@/src/app/(student-Profile)/student-result/student-profile.module.scss";
import { TRANSLATIONSAPPCONSTANTS } from "@/src/constants/translationConstants";
export default function StudentProfile() {
  const { studentProfile,  studentTrans } = UseStudentProfileState();
  return (
    <MainLayout>
      <div className={style["table-container"]}>
        <h3 className={style["heading"]}>{studentTrans(TRANSLATIONSAPPCONSTANTS.STUDENTRESULTDETAILS)}</h3>

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
            loading="eager"
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
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.MARKSOBTAINED)}</th>
              <td>{studentProfile?.results?.marks}</td>
            </tr>

            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.GRADEPOINTS)}</th>
              <td>{studentProfile?.results?.grade_points}</td>
            </tr>

            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.RESULT)}</th>
              <td>{studentProfile?.results?.result}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
