import { AxiosService } from "@/src/services/axios.service";
import { ISemesterData, ISemesterInput, ISemesterResponse } from "../modal/ISemester";
import { SEMESTER } from "@/src/constants/api-end-points.constants";

export class SemesterApiProvider extends AxiosService {
    static apolloInstance = new SemesterApiProvider();

    async getSemester(
        success:(data:ISemesterResponse)=>void,
        error:(err:string | any)=>void,
    ){
        try {
            const response  = await this.get<ISemesterResponse>(SEMESTER.GETSEMESTER);
            success(response.data)
        } catch (err) {
            error(err);
        }
    }


    async createSemester(
        params:ISemesterInput,
        success:(data:ISemesterResponse)=>void,
        error:(err:string | any)=>void,
    ) {
        try {
            const res = await this.post<ISemesterResponse>(SEMESTER.CREATESEMESTER,params);
            success(res.data);
        } catch (err) {
            error(err);
        }
    }


    async getSemesterById(
      id: number,
      success: (data: any) => void,
      error: (err: any) => void,
    ) {
      try {
        const res = await this.get(
          `${SEMESTER.GETSEMESTER}/${id}`
        );
    
        success(res.data);
      } catch (err) {
        error(err);
      }
    }
    
    async updateSemester(
      id: number,
      params: ISemesterInput,
      success: (data: any) => void,
      error: (err: any) => void,
    ) {
      try {
        const res = await this.put(
          `${SEMESTER.UPDATESEMESTER}/${id}`,
          params
        );
    
        success(res.data);
      } catch (err) {
        error(err);
      }
    }
    
    
    async deleteSemester(
      id: number,
      success: (data: any) => void,
      error: (err: any) => void,
    ) {
      try {
        const res = await this.delete(
          `${SEMESTER.DELETESEMESTER}/${id}`
        );
    
        success(res.data);
      } catch (err) {
        error(err);
      }
    }
    }
    
