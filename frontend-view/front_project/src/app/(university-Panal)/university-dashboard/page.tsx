"use client";

import Dashboard from "@/src/components/Dashboard/Dashboard";
import  DashboardImg from "@/src/assets/dashboard.png";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { useStudentsState } from "../students/useStudentsState";
import { UseSubjectState } from "../subjects/useSubjectState";
import { UseSemesterState } from "../semesters/useSemesterState";
import { useCoursesState } from "../courses/useCoursesState";
import { UseDashboard } from "@/src/components/Dashboard/useDashboardState";
import Image from "next/image";
export default function UniversityDashboardPage() {
    const { totalRecordStu } = useStudentsState();
    const { totalRecords } = UseSubjectState();
    const { semester } = UseSemesterState();
    const { course } = useCoursesState();
    const { dashboardDetails } = UseDashboard({
        studentsCount: totalRecordStu || 0,
        subjectsCount: totalRecords || 0,
        semesterCount: semester?.length || 0,
        courseCount: course?.length || 0,
    });

    return (

        <MainLayout>
            <Dashboard
                cards={dashboardDetails}
            />
        </MainLayout>

    );
}