import { ForgotPassword } from "@src/module/universityPanel/models/forgot-password.model.js";
 
export const validateForget = (
    forgetPass:ForgotPassword
)=>{
    const {email} = forgetPass;

    if(!email?.trim()){
        return "Email is Required";
    }
    
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      return "Please enter a valid email address";
    }
    
}