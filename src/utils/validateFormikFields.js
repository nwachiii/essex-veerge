export const validateSpecificFields = async (fieldsToCheck, formik) => {
  const errors = await formik.validateForm();

  const isValid = fieldsToCheck.every(field => !errors[field]);
  return isValid;
};
