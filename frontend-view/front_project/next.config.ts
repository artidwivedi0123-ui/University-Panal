import type { NextConfig } from "next";
import createNextIntlPlugin  from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode:false,

  sassOptions:{
    includePath : [path.join(process.cwd(), "src/styles")],
  },
};


export default withNextIntl(nextConfig);
