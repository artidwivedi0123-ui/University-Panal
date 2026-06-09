import { AxiosService } from "@/src/services/axios.service";
import {
  IStudentFeesData,
  IStudentFeesDetailsByIdResponse,
  IStudentFeesInput,
  IStudentFeesInputResponse,
  IStudentFeesResponse,
} from "../modal/IStudent.fees";
import { STUDENTFEES } from "@/src/constants/api-end-points.constants";
import { ISemesterInput } from "@/src/modules/university/semester/modal/ISemester";

export class StudentFeesApiProvider extends AxiosService {
  static apolloInstance = new StudentFeesApiProvider();

  async createStudentFees(
    params: IStudentFeesData,
    success: (data: IStudentFeesInputResponse) => void,
    error: (err: string | any) => void,
  ) {
    try {
      const res = await this.post<IStudentFeesInputResponse>(
        STUDENTFEES.CREATESTUDFEES,
        params,
      );
      success(res.data);
    } catch (err) {
      error(err);
    }
  }

  async getFeesStudent(
    page:number,
    limit:number,
    search:string,
    success: (data: IStudentFeesResponse) => void,
    error: (err: string | any) => void,
  ) {
    try {
      const response = await this.get<IStudentFeesResponse>(
        `${STUDENTFEES.GETSTUDFEES}?page=${page}&limit=${limit}&search=${search}`,
      );
      success(response.data);
    } catch (err) {
      error(err);
    }
  }
  async updateStudFees (
    id:number,
    params:IStudentFeesInput,
    success:(data:IStudentFeesInputResponse)=>void,
    error:(err:string | any)=>void,
  ) {
    try {
      const response = await  this.put<IStudentFeesInputResponse>(`${STUDENTFEES.UPDATESTUDFEES}/${id}`,params);
      success(response.data);
    } catch (err) {
      error(err);
    }
  }


  async deleteStudFees(
    id:number,
    success:(data:IStudentFeesData)=>void,
    error:(err:string | any)=>void,
  ) {
  try {
    const response  = await  this.delete<IStudentFeesData>(
      `${STUDENTFEES.DELETESTUDFEES}/${id}`
    );
    success(response.data);
  } catch (err) {
    error(err);
  }
  }


  async getStuFeesById(
    id:number,
    success:(data:IStudentFeesDetailsByIdResponse)=>void,
    error:(err:string | any)=>void,
  ) {
    try {
      const response = await this.get<IStudentFeesDetailsByIdResponse>(`${STUDENTFEES.UPDATESTUDFEES}/${id}`);
      success(response.data);
    } catch (err) {
      error(err);
    }
  }

}
