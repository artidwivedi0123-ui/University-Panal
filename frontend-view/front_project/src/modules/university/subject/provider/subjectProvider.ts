import { AxiosService } from "@/src/services/axios.service";
import {
  ISubjectById,
  ISubjectByIdResponse,
  ISubjectDashboardResponse,
  ISubjectData,
  ISubjectInput,
  ISubjectResponse,
} from "../modal/ISubject";
import { SUBJECT } from "@/src/constants/api-end-points.constants";

export class SubjectApiProvider extends AxiosService {
  static apolloInstance = new SubjectApiProvider();
  async getSubjects(
    page: number,
    limit: number,
    search: string,
    success: (data: ISubjectResponse) => void,
    error: (err: any) => void,
  ) {
    try {
      const res = await this.get<ISubjectResponse>(
        `${SUBJECT.GETSUBJECT}?page=${page}&limit=${limit}&search=${search}`,
      );

      success(res.data);
    } catch (err) {
      error(err);
    }
  }

  async createSubject(
    params: ISubjectInput,
    success: (data: ISubjectResponse) => void,
    error: (err: any | string) => void,
  ) {
    try {
      const res = await this.post<ISubjectResponse>(
        SUBJECT.CREATESUBJECT,
        params,
      );
      success(res.data);
    } catch (err) {
      error(err);
    }
  }

  async deleteSubject(
    id: number,
    success: (data: ISubjectData) => void,
    error: (err: string | any) => void,
  ) {
    try {
      const res = await this.delete<ISubjectData>(
        `${SUBJECT.DELETESUBJCET}/${id}`,
      );
      success(res.data);
    } catch (err) {
      error(err);
    }
  }

  async updateSubject(
    id: number,
    params: ISubjectInput,
    success: (data: ISubjectResponse) => void,
    error: (err: any | string) => void,
  ) {
    try {
      console.log("REQUEST URL =", `${SUBJECT.UPDATESUBJECT}/${id}`);

      const res = await this.put<ISubjectResponse>(
        `${SUBJECT.UPDATESUBJECT}/${id}`,
        params,
      );

      success(res.data);
      console.log("Res", res);
    } catch (err) {
      console.error(err);
      error(err);
    }
  }

  async getSubjectById(
    id: number,
    success: (data: ISubjectByIdResponse) => void,
    error: (err: any | string) => void,
  ) {
    try {
      const res = await this.get<ISubjectByIdResponse>(
        `${SUBJECT.GETSUBJECT}/${id}`,
      );
      success(res.data);
    } catch (err) {
      error(err);
    }
  }

  async getSubjectDashboard(
    success: (data: ISubjectDashboardResponse) => void,
    error: (err: string | any) => void,
  ) {
    try {
      const res = await this.get<ISubjectDashboardResponse>(
        SUBJECT.DASHBOARDSUBJECT,
      );
      success(res.data);
    } catch (err) {
      error(err);
    }
  }
}
