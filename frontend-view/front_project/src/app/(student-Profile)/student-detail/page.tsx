"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { UseStudentProfileState } from "../student-result/useStudentProfileState";
import Image from "next/image";
import { FIcon, MIcon, Students } from "@/src/assets";
import style from "@/src/app/(student-Profile)/student-result/student-profile.module.scss";
import { formatDateTime } from "@/src/utils/app.utils";
export default function StudentProfile() {
  const { studentProfile } = UseStudentProfileState();
  return (
    <MainLayout>
      <div className={style["table-container"]}>
        <h3 className={style["heading"]}>Student' Detail Card</h3>
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
              <th>Student Name</th>
              <td>{studentProfile?.profile?.name}</td>
            </tr>

            <tr>
              <th>Email Id</th>
              <td>{studentProfile?.profile?.email}</td>
            </tr>

            <tr>
              <th>Phone Number</th>
              <td>{studentProfile?.profile?.phoneNumber}</td>
            </tr>

            <tr>
              <th>Address</th>
              <td>{studentProfile?.profile?.address}</td>
            </tr>
            <tr>
              <th>Date of Birth</th>
              <td>{formatDateTime(studentProfile?.profile?.dateOfBirth)}</td>
            </tr>

            <tr>
              <th>City</th>
              <td>{studentProfile?.profile.city}</td>
            </tr>
            <tr>
              <th>State</th>
              <td>{studentProfile?.profile?.state}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{studentProfile?.profile?.country}</td>
            </tr>
            <tr>
              <th>Father's Name</th>
              <td>{studentProfile?.profile?.fatherName}</td>
            </tr>
            <tr>
              <th>Mother's Name</th>
              <td>{studentProfile?.profile?.motherName}</td>
            </tr>
            <tr>
              <th>Previous School</th>
              <td>{studentProfile?.profile?.previousSchool}</td>
            </tr>
            <tr>
              <th>Previous College</th>
              <td>
                {studentProfile?.profile?.course_type === "PG"
                   && studentProfile?.profile?.previousCollege || "N/A" }
              </td>
            </tr>
            <tr>
              <th>Previous Study Field</th>
              <td>{studentProfile?.profile?.previousStudyField}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
