export const AUTH_SECTION_TYPE = {
    LOGIN:"login",
    REGISTER:"register",
} as const;

export type AUTH_SECTION_PAGE = 
(typeof AUTH_SECTION_TYPE)[keyof typeof AUTH_SECTION_TYPE];