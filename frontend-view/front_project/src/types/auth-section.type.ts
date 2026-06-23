export const AUTH_SECTION_TYPE = {
  LOGIN: "login",
  REGISTER: "register",
  FORGET_PASSWORD: "forget-password",
  RESET_PASSWORD:"reset-password",
} as const;

export type AUTH_SECTION_PAGE =
  (typeof AUTH_SECTION_TYPE)[keyof typeof AUTH_SECTION_TYPE];
