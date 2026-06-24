export interface User {
  id?: number;
  full_name: string;
  role: string;
  email: string;
}

export interface IRegisterInput {
  full_name: string;
  email: string;
  password: string;
  role?: string;
}

export interface IRegisterData {
  full_name: string;
  email: string;
  role?: string;
}

export interface IRegisterResponse {
  success: boolean;
  message: string;
  data: IRegisterData;
}

export interface ILoginInput {
  email: string;
  password: string;
  role?: string;
}

export interface ILoginData {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface ILoginResponse {
  success: boolean;
  data: ILoginData;
  message: string;
}


export interface IForgotPassword {
  email:string;
}
export interface IForgotPasswordResponse {
  success:boolean;
  message:string;
}

export interface IResetPassword {
     new_password:string;
    confirm_password:string;
}
export interface IResetPasswordResponse  {
  success:boolean;
  message:string;
}