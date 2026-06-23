import dotenv from  "dotenv";
dotenv.config();

interface ConfigProps {
  Port: number | string;
  Db_user: string;
  Db_hostname: string;
  Db_name: string;
  Db_password: string;
  Db_port: number | string;
  jwt_screct: string;
  jwt_refresh_secret: string;
  frontend_url: string;
}

export const ConfigURL: ConfigProps = {
  Db_hostname: process.env.DB_HOSTNAME || "",
  Db_name: process.env.DB_NAME || "",
  Db_password: process.env.DB_PASSWORD || "",
  Db_port: process.env.DB_PORT || "",
  Db_user: process.env.DB_USER || "",
  frontend_url: process.env.FRONTENDURL || "",
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || "",
  jwt_screct: process.env.JWT_SECRET || "",
  Port: process.env.PORT || "",
};
