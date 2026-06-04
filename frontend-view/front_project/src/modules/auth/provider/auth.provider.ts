import { AxiosService } from "@/src/services/axios.service";
import { ILoginInput, ILoginResponse, IRegisterInput, IRegisterResponse } from "../modal/auth";
import { AUTH } from "@/src/constants/api-end-points.constants";

export class AuthApiProvider extends AxiosService {
  static apolloInstance = new AuthApiProvider();

  async register(
    params: IRegisterInput,
    success: (data: IRegisterResponse) => void,
    error: (err: string | any) => void,
  ) {
    try {
      const res = await this.post<IRegisterResponse>(AUTH.REGISTER, params);
      success(res.data);
    } catch (err) {
      error(err);
    }
  }



  async login(
  params: ILoginInput,
  success: (data: ILoginResponse) => void,
  error: (err: any | string) => void
) {

  try {

    const res = await this.post<ILoginResponse>(
      AUTH.LOGIN,
      params
    );

    success(res.data);

  } catch (err) {

    error(err);

  }
}
}
