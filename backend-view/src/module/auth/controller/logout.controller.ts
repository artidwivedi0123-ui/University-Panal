// import { Request,Response } from "express";
// import { logoutService } from "../service/logout.service.js";
// import { AuthRequest } from "../model/auth-req.model.js";

// export const logout = async(
//     req:AuthRequest,
//     res:Response
// )=> {
//     try {
//      const  {userId :number} = req.user?.id;
     
//      await logoutService(userId);

//      res.status(200).json({
//         success:true,
//         message:"Logout Successfully ",
//      });
//     } catch (error) {
        
//     }
// }