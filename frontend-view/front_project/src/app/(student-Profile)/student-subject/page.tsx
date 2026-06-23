"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { UseStudentProfileState } from "../student-result/useStudentProfileState";
import Image from "next/image";
import { FIcon, MIcon, Students } from "@/src/assets";
import style from "@/src/app/(student-Profile)/student-result/student-profile.module.scss";
export default function StudentSubjects() {
  const { studentProfile } = UseStudentProfileState();

  return (
    <MainLayout>
      <div className={style["table-container"]}>
        <h3 className={style["heading"]}>Subject Detailing</h3>

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
              <th>Roll Number</th>
              <td>{studentProfile?.profile?.rollNumber}</td>
            </tr>

            <tr>
              <th>Subjects</th>
              <td>
                <table className={style["subject-table"]}>
                  <thead>
                    <tr>
                      <th>Subject Name</th>
                      <th>Subject Code</th>
                      <th>Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentProfile?.subjects?.map((subject, index) => (
                      <tr key={index}>
                        <td>{subject.subject_name}</td>
                        <td>{subject.subject_code}</td>
                        <td>{subject.credits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
