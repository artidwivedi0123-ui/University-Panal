import { NextFunction,Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../model/auth-req.model.js";


export const authMiddleware =  (
    req:AuthRequest,
    res:Response,
    next:NextFunction,
) =>{

    try {
        
        const authHeader  = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({
                success:false,
                message:"Authorization Token Required",
            });
        }
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Invalid Token Format",
            });
        }

        const decode  =  jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as  {
            id:number;
            role:string;
        };
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({
            success:false,
            message:"Invalid Token Expression, Something went wrong"
        });
    }

}