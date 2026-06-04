import axios from "axios";
import { AppConfig } from "../config/app.config";

export const  apiInstance = axios.create({
    baseURL:AppConfig.api_url,
    withCredentials:true
})