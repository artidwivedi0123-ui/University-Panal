"use client";

import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { UseSubjectState } from "../../subjects/useSubjectState";
import DetailCard from "@/src/components/Card/Card";


export default function SubjectDetails() {
  const {
    subjectDetails,
    loading,
  } = UseSubjectState();

  if (loading) return <h2>Loading...</h2>;

  if (!subjectDetails)
    return <h2>Subject Not Found</h2>;

  return (
    <MainLayout>
      <DetailCard
        title="Subject Details"
        fields={[
          {
            label: "Subject Name",
            value: subjectDetails.subject_name,
          },
          {
            label: "Subject Code",
            value: subjectDetails.subject_code,
          },
          {
            label: "Course Name",
            value: subjectDetails.course_name,
          },
          {
            label: "Credits",
            value: subjectDetails.credits,
          },
        ]}
      />
    </MainLayout>
  );
}