"use client";
import MainLayout from "@/src/components/Main-Layout/Layout/Main-layout";
import { useCoursesState } from "../courses/useCoursesState"
import Table from "@/src/components/Table/Table";
import { UNIVERSITY_SECTION_TYPE } from "@/src/types/university-section.type";
import ModalBox from "@/src/components/Modal/Modal";
import { withAdmin } from "@/src/hoc/withAdminHoc";
const  CourseManagedPage=()=>{
    const {course,router,handleDeleteCourse,showModal,
        openDeleteModal,closeDeleteModal
    } = useCoursesState();
    return (
        <MainLayout>
            <Table 
            data={course}
            type={UNIVERSITY_SECTION_TYPE.COURSE}
            addBtn={()=>router.push('/add-course')}
            openDeleteModal={openDeleteModal}
            handleDelete={handleDeleteCourse}
            handleEdit={(id)=>router.push(`/edit-course/${id}`)}
            />

            {
                showModal && (
                    <ModalBox 
                    confirmText="Delete"
                    message="Are you really to want  delete this?"
                    onCancel={closeDeleteModal}
                    onConfirm={handleDeleteCourse}
                    title="Delete this Course"
                    />
                )
            }
        </MainLayout>
    )
};
export default withAdmin(CourseManagedPage);