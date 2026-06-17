"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { UseStudentProfileState } from "@/src/app/(university-Panal)/student-profile/useStudentProfileState";
import Image from "next/image";
import { FIcon, MIcon, Students } from "@/src/assets";
import { getOrdinal } from "@/src/utils/app.utils";
import style from "@/src/app/(university-Panal)/student-profile/student-profile.module.scss";
export default function StudentProfile() {
  const { studentProfile } = UseStudentProfileState();
  console.log("studentProfile",studentProfile);
  return (
    <MainLayout>
     <div className={style["table-container"]}>
  <h3 className={style["heading"]}>Student Detailing</h3>

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
        <th>Subject Name</th>
        <td>{studentProfile?.subjects?.map((it)=>it.subject_name)}</td>
      </tr>

     <tr>
        <th>Subject Code</th>
        <td>{studentProfile?.subjects?.map((it)=>it.subject_code)}</td>
      </tr>

       <tr>
        <th>Subject Credits</th>
        <td>{studentProfile?.subjects?.map((it)=>it.credits)}</td>
      </tr>

   
    </tbody>
  </table>
</div>
    </MainLayout>
  );
}
