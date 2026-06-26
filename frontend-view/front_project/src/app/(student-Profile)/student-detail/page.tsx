"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { UseStudentProfileState } from "../student-result/useStudentProfileState";
import Image from "next/image";
import { FIcon, MIcon, Students } from "@/src/assets";
import style from "@/src/app/(student-Profile)/student-result/student-profile.module.scss";
import { formatDateTime } from "@/src/utils/app.utils";
import { TRANSLATIONSAPPCONSTANTS } from "@/src/constants/translationConstants";
export default function StudentProfile() {
  const { studentProfile,studentTrans } = UseStudentProfileState();
  return (
    <MainLayout>
      <div className={style["table-container"]}>
        <h3 className={style["heading"]}>{studentTrans(TRANSLATIONSAPPCONSTANTS.STUDENTIDCARD)}</h3>
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
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.EMAILID)}</th>
              <td>{studentProfile?.profile?.email}</td>
            </tr>

            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.CONTACTNUMBER)}</th>
              <td>{studentProfile?.profile?.phoneNumber}</td>
            </tr>

            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.ADDRESSDETAILS)}</th>
              <td>{studentProfile?.profile?.address}</td>
            </tr>
            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.DATEOFBIRTH)}</th>
              <td>{formatDateTime(studentProfile?.profile?.dateOfBirth)}</td>
            </tr>

            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.CITY)}</th>
              <td>{studentProfile?.profile.city}</td>
            </tr>
            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.STATE)}</th>
              <td>{studentProfile?.profile?.state}</td>
            </tr>
            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.COUNTRY)}</th>
              <td>{studentProfile?.profile?.country}</td>
            </tr>
            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.FATHERNAME)}</th>
              <td>{studentProfile?.profile?.fatherName}</td>
            </tr>
            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.MOTHERNAME)}</th>
              <td>{studentProfile?.profile?.motherName}</td>
            </tr>
            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.STUDENTPREVIOUSSCHOOL)}</th>
              <td>{studentProfile?.profile?.previousSchool}</td>
            </tr>
            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.STUDENTPREVIOUSCOLLEGE)}</th>
              <td>
                {studentProfile?.profile?.course_type === "PG"
                   && studentProfile?.profile?.previousCollege || "N/A" }
              </td>
            </tr>
            <tr>
              <th>{studentTrans(TRANSLATIONSAPPCONSTANTS.STUDENTPREVIOUSEDUCATIONFIELD)}</th>
              <td>{studentProfile?.profile?.previousStudyField}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
