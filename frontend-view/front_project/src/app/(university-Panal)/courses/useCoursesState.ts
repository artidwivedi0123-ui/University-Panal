import { UNIVERSITYROUTES } from "@/src/constants/routes.contants";
import {
  ICourseById,
  ICourseData,
  ICourseInput,
} from "@/src/modules/university/course/modal/ICourse";
import { CourseApiProvider } from "@/src/modules/university/course/provider/courseProvider";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const useCoursesState = () => {
  const params = useParams();
  const id = params?.id as string;
  const [courseDetailId, setCourseDetailsId] = useState<ICourseById | null>(
    null,
  );
  const isEdit = !!id;
  const [course, setCourse] = useState<ICourseData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectCourseId, setSelectCourseId] = useState<number | null>(null);
  const router = useRouter();
  const [courseData, setCourseData] = useState<ICourseInput>({
    course_name: "",
    course_type: "",
    total_semesters: 0,
  });
  const fetchCourses = useCallback(() => {
    setLoading(true);
    CourseApiProvider.apolloInstance.getCourse(
      (res) => {
        setLoading(false);
        setCourse(res?.data);
        console.log("Course Response Data", res?.data);
      },
      (err) => {
        setLoading(false);
        console.error(err);
      },
    );
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleChangeCourse = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitCourse = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: ICourseInput = {
      course_name: courseData.course_name,
      course_type: courseData.course_type,
      total_semesters: courseData.total_semesters,
    };
    if (isEdit) {
      CourseApiProvider.apolloInstance.updateCourse(
        Number(id),
        payload,
        () => {
          toast.success("Course Updated Successfully");
          router.push(UNIVERSITYROUTES.COURSES);
        },
        (err) => {
          toast.error(
            err?.response?.data?.message || "Error in  updating  Course",
          );
        },
      );
    } else {
      CourseApiProvider.apolloInstance.createCourse(
        payload,
        (res) => {
          toast.success("Course Added Successfully");
          router.push(UNIVERSITYROUTES.COURSES);
        },
        (err) => {
          toast.error(
            err?.response?.data?.message || "Error  in adding  Course",
          );
        },
      );
    }
  };

  const openDeleteModal = (id: number) => {
    setSelectCourseId(id);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setSelectCourseId(null);
    setShowModal(false);
  };

  const handleDeleteCourse = () => {
    setLoading(true);
    if (selectCourseId === null) return;

    CourseApiProvider.apolloInstance.deleteCourse(
      selectCourseId,
      (res) => {
        setLoading(false);
        setCourse((prev) => prev?.filter((cou) => cou.id !== selectCourseId));
        toast.success("Course Deleted Successfully");
        closeDeleteModal();
      },
      (err) => {
        toast.error(
          err?.response?.data?.message || "Error  in Deleting Course",
        );
      },
    );
  };

  const fetchCourseById = useCallback(() => {
    if (!id) return;

    CourseApiProvider.apolloInstance.getCourseById(
      Number(id),
      (res) => {
        setCourseDetailsId(res.data);
        setCourseData({
          course_name: res.data.course_name,
          course_type: res.data.course_type,
          total_semesters: res.data.total_semesters,
        });
      },
      (err) => {
        toast.error(
          err?.response.data?.message || "Error  in Fetching this Course",
        );
      },
    );
  }, [id]);

  useEffect(() => {
    fetchCourseById();
  }, [fetchCourseById]);

  return {
    course,
    setCourse,
    loading,
    router,
    showModal,
    openDeleteModal,
    closeDeleteModal,
    handleChangeCourse,
    handleDeleteCourse,
    handleSubmitCourse,
    courseData,
  };
};
