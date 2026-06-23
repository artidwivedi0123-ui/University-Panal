interface IConfig {
  api_url: string;
}
export const AppConfig: IConfig = {
  api_url: process.env.NEXT_PUBLIC_API_BASE_URL || "",
};
