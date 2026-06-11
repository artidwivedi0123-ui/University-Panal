export const validateId = (id: string | string[]) => {

  if (isNaN(Number(id))) {
    return {
      success: false,
      message: "Id must be a valid number",
    };
  }

  return null;
};