import { AxiosService } from "@/src/services/axios.service";
import {
  IStudentDetailInput,
  IStudentDetailsByIdResponse,
  IStudentDetailsData,
  IStudentDetailsResponseData,
} from "../model/IStudentDetails";
import { STUDENTDETAILS } from "@/src/constants/api-end-points.constants";

export class StudentDetailApiProvider extends AxiosService {
  static apolloInstance = new StudentDetailApiProvider();

  async getStudentDetails(
    page: number,
    limit: number,
    search: string,
    success: (data: IStudentDetailsResponseData) => void,
    error: (err: string | any) => void,
  ) {
    try {
      const response = await this.get<IStudentDetailsResponseData>(
        `${STUDENTDETAILS.GETSTUDENTDETAILS}?page=${page}&limit=${limit}&search=${search}`,
      );
      success(response.data);
    } catch (err) {
      error(err);
    }
  }

  async addStudentDetails(
    params: IStudentDetailInput,
    success: (data: IStudentDetailsResponseData) => void,
    error: (err: any | string) => void,
  ) {
    try {
      const response = await this.post<IStudentDetailsResponseData>(
        STUDENTDETAILS.CREATESTUDENTDETAILS,
        params,
      );
      success(response.data);
    } catch (err) {
      error(err);
    }
  }

  async getStudentDetailsById(
    id: number,
    success: (data:IStudentDetailsResponseData) => void,
    error: (err: any | string) => void,
  ) {
    try {
      const response = await this.get<IStudentDetailsResponseData>(
        `${STUDENTDETAILS.GETSTUDENTDETAILSBYID}/${id}`,
      );
      success(response.data);
    } catch (err) {
      error(err);
    }
  }

  async updateStudentDetails(
    id: number,
    params: IStudentDetailInput,
    success: (data: IStudentDetailsResponseData) => void,
    error: (err: any | string) => void,
  ) {
    try {
      const response = await this.put<IStudentDetailsResponseData>(
        `${STUDENTDETAILS.UPDATESTUDENTDETAIL}/${id}`,
        params,
      );
      success(response.data);
    } catch (err) {
      error(err);
    }
  }

  async deleteStudentDetails(
    id:number,
    success:(data:IStudentDetailsData)=>void,
    error:(err:string | any)=>void,
  )
  {
    try {
      const response  = await this.delete<IStudentDetailsData>(
        `${STUDENTDETAILS.DELETESTUDENTDETAIL}/${id}`
      );
      success(response.data);
    } catch (err) {
      error(err);
    }
  }
}
