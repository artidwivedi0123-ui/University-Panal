import { AxiosService } from "@/src/services/axios.service";
import {
    IFeesDetailsByIdResponse,
  IFeeStructureData,
  IFeeStructureInput,
  IFeeStructureResponse,
} from "../modal/IFees";
import { FEES } from "@/src/constants/api-end-points.constants";

export class FeesApiProvider extends AxiosService {
  static apolloInstance = new FeesApiProvider();
  async getFees(
    page:number,
    limit:number,
    search:string,
    success: (data: IFeeStructureResponse) => void,
    error: (err: string | any) => void,
  ) {
    try {
      const response = await this.get<IFeeStructureResponse>
      (`${FEES.GETFEES}?page=${page}&limit=${limit}&search=${search}`);
      success(response.data);
      console.log(response);
    } catch (err) {
      error(err);
    }
  }

  async createFees(
    params: IFeeStructureInput,
    success: (data: IFeeStructureResponse) => void,
    error: (err: string | any) => void,
  ) {
    try {
      const response = await this.post<IFeeStructureResponse>(
        FEES.CREATEFEES,
        params,
      );
      success(response.data);
    } catch (err) {
      error(err);
    }
  }

  async updateFees(
    id: number,
    params: IFeeStructureInput,
    success: (data: IFeeStructureResponse) => void,
    error: (err: string | any) => void,
  ) {
    try {
      const res = await this.put<IFeeStructureResponse>(
        `${FEES.UPDATEFEES}/${id}`,
        params,
      );
      success(res.data);
    } catch (err) {
      console.error(err);
      error(err);
    }
  }

  async deleteFees(
    id: number,
    success: (data: IFeeStructureData) => void,
    error: (err: string | any) => void,
  ) {
    try {
      const res = await this.delete<IFeeStructureData>(
        `${FEES.DELETEFEES}/${id}`,
      );
      success(res.data);
    } catch (err) {
      error(err);
    }
  }

  async getFeesById(
    id: number,
    success: (data:IFeesDetailsByIdResponse) => void,
    error: (err: any | string) => void,
  ) {
    try {
      const response = await this.get<IFeesDetailsByIdResponse>(
        `${FEES.GETFEES}/${id}`,
      );
      success(response.data);
    } catch (err) {
      error(err);
    }
  }
}
