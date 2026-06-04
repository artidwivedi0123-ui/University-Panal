import { AxiosService } from "@/src/services/axios.service";
import {
  IStudentByIdResponse,
  IStudentDashboard,
  IStudentDashboardResponse,
  IStudentResponse,
  IStudentsData,
  IStudentsInput,
} from "../modal/IStudents";

import { STUDENT } from "@/src/constants/api-end-points.constants";

export class StudentApiProvider extends AxiosService {
  static apolloInstance = new StudentApiProvider();

  // GET STUDENTS
  async getStudent(
    page: number,
    limit: number,
    search: string,
    success: (data: IStudentResponse) => void,
    error: (err: string | any) => void,
  ) {
    try {
      const response = await this.get<IStudentResponse>(
        `${STUDENT.GETSTUDENTS}?page=${page}&limit=${limit}&search=${search}`,
      );

      success(response.data);
    } catch (err) {
      error(err);
    }
  }

  // CREATE STUDENT
  async createStudent(
    params: IStudentsInput,
    success: (data: IStudentResponse) => void,
    error: (err: string | any) => void,
  ) {
    try {
      const response = await this.post<IStudentResponse>(
        STUDENT.CREATESTUDENT,
        params,
      );

      success(response.data);
    } catch (err) {
      error(err);
    }
  }
  async deleteStudent(
    id: number,
    success: (data: IStudentsData) => void,
    error: (err: string | any) => void,
  ) {
    try {
      const res = await this.delete<IStudentsData>(
        `${STUDENT.DELETESTUDENT}/${id}`,
      );
      success(res.data);
    } catch (err) {
      error(err);
    }
  }

  async updateStudent(
    id: number,
    params: IStudentsInput,
    success: (data: IStudentResponse) => void,
    error: (err: string | any) => void,
  ) {
    try {
      const res = await this.put<IStudentResponse>(
        `${STUDENT.UPDATESTUDENT}/${id}`,
        params,
      );
      success(res.data);
    } catch (err) {
      console.error(err);
      error(err);
    }
  }

  async getStudentById(
    id: number,
    success: (data: IStudentByIdResponse) => void,
    error: (err: any | string) => void,
  ) {
    try {
      const res = await this.get<IStudentByIdResponse>(
        `${STUDENT.GETSTUDENTS}/${id}`,
      );
      success(res.data);
    } catch (err) {
      error(err);
    }
  }

  async getStudentDashboard(
    success: (data: IStudentDashboardResponse) => void,
    error: (err: string | any) => void,
  ) {
    try {
      const res = await this.get<IStudentDashboardResponse>(
        STUDENT.DASHBOARDSTUDENT,
      );
      success(res.data);
    } catch (err) {
      error(err);
    }
  }
}
