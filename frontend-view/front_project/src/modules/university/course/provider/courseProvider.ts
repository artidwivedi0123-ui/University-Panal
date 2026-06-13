import { COURSE } from "@/src/constants/api-end-points.constants";
import { AxiosService } from "@/src/services/axios.service";
import { ICourseByIdResponse, ICourseData, ICourseInput, ICourseResponse } from "../modal/ICourse";

export class CourseApiProvider extends AxiosService {
  static apolloInstance = new CourseApiProvider();

  //  get  All Courses
  async getCourse(
    success: (data: ICourseResponse) => void,
    error: (err: string | any) => void,
  ) {
    try {
      const response = await this.get<ICourseResponse>(COURSE.GETCOURSES);
      success(response.data);
    } catch (err) {
      error(err);
    }
  }
 // Create Course
  async createCourse(
    params:ICourseInput,
    success:(data:ICourseResponse)=>void,
    error:(err:string | any)=>void,
  ) {
    try {
        const res = await this.post<ICourseResponse>(COURSE.CREATECOURSES,params);
        success(res.data);
    } catch (err) {
        error(err);
    }
  }

  // get Course By Id
  async getCourseById(
  id: number,
  success: (data:ICourseByIdResponse) => void,
  error: (err: any) => void,
) {
  try {
    const res = await this.get<ICourseByIdResponse>(
      `${COURSE.GETCOURSES}/${id}`
    );

    success(res.data);
  } catch (err) {
    error(err);
  }
}

//  update Course
async updateCourse(
  id: number,
  params: ICourseInput,
  success: (data: ICourseResponse) => void,
  error: (err: any) => void,
) {
  try {
    const res = await this.put<ICourseResponse>(
      `${COURSE.UPDATECOURSE}/${id}`,
      params
    );

    success(res.data);
  } catch (err) {
    error(err);
  }
}

// Delete Course
async deleteCourse(
  id: number,
  success: (data: ICourseData) => void,
  error: (err: any) => void,
) {
  try {
    const res = await this.delete<ICourseData>(
      `${COURSE.DELTECOURSE}/${id}`
    );

    success(res.data);
  } catch (err) {
    error(err);
  }
}
}
