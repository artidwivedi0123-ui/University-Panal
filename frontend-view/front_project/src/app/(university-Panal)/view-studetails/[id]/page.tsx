"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import DetailCard from "@/src/components/Card/Card";
import { useStudentDetailsState } from "../../student-details/useStudentDetailsState";
import { formatDateTime } from "@/src/utils/app.utils";
import { withAdmin } from "@/src/hoc/withAdminHoc";
const StudentProfileDetails = () => {
  const { studentDetailbyId, loading } = useStudentDetailsState();
  if (loading) return <h2>Loading...</h2>;

  return (
    <MainLayout>
      <DetailCard
        title="Student Personal  Details"
        fields={[
          {
            label: "Name",
            value: studentDetailbyId?.full_name ?? "",
          },
          {
            label: "Email",
            value: studentDetailbyId?.email ?? "",
          },
          {
            label: "Contact Details",
            value: studentDetailbyId?.phone_number ?? "",
          },
          {
            label: "Address",
            value: studentDetailbyId?.address ?? "",
          },
          {
            label: "City",
            value: studentDetailbyId?.city ?? "",
          },
          {
            label: "Country",
            value: studentDetailbyId?.country ?? "",
          },
          {
            label: "Date of Birth",
            value: formatDateTime(studentDetailbyId?.date_of_birth ?? ""),
          },
          {
            label: "Father's Name",
            value: studentDetailbyId?.father_name ?? "",
          },
          {
            label: "Mother's Name",
            value: studentDetailbyId?.mother_name ?? "",
          },
          {
            label: "Previous School",
            value: studentDetailbyId?.previous_school ?? "",
          },
          {
            label: "Previous College",
            value: studentDetailbyId?.previous_college ?? "",
          },
          {
            label: "Previous Education Field (Commerce/Arts/Science/other)",
            value: studentDetailbyId?.previous_study_field ?? "",
          },
        ]}
      />
    </MainLayout>
  );
};
export default withAdmin(StudentProfileDetails);
