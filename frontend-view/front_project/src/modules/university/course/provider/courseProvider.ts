import { COURSE } from "@/src/constants/api-end-points.constants";
import { AxiosService } from "@/src/services/axios.service";
import { ICourseInput, ICourseResponse } from "../modal/ICourse";

export class CourseApiProvider extends AxiosService {
  static apolloInstance = new CourseApiProvider();

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

  async getCourseById(
  id: number,
  success: (data: any) => void,
  error: (err: any) => void,
) {
  try {
    const res = await this.get(
      `${COURSE.GETCOURSES}/${id}`
    );

    success(res.data);
  } catch (err) {
    error(err);
  }
}

async updateCourse(
  id: number,
  params: ICourseInput,
  success: (data: any) => void,
  error: (err: any) => void,
) {
  try {
    const res = await this.put(
      `${COURSE.UPDATECOURSE}/${id}`,
      params
    );

    success(res.data);
  } catch (err) {
    error(err);
  }
}


async deleteCourse(
  id: number,
  success: (data: any) => void,
  error: (err: any) => void,
) {
  try {
    const res = await this.delete(
      `${COURSE.DELTECOURSE}/${id}`
    );

    success(res.data);
  } catch (err) {
    error(err);
  }
}
}
