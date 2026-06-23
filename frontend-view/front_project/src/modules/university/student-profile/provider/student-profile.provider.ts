import { AxiosService } from "@/src/services/axios.service";
import { IStudentProfileResponse } from "../modal/IStudentProfile";
import { STUDENTPROFILE } from "@/src/constants/api-end-points.constants";

export class StudentProfileApiProvider extends AxiosService {
  static apolloInstance = new StudentProfileApiProvider();
  async getStudentProfile(
    success: (data: IStudentProfileResponse) => void,
    error: (err: string | any) => void,
  ) {
    try {
      const response = await this.get<IStudentProfileResponse>(
        STUDENTPROFILE.GETSTUDENTPROFILE,
      );
      success(response.data);
    } catch (err) {
      error(err);
    }
  }
}
