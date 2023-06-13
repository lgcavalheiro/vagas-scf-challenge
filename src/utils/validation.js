const formatErrorMessage = (fieldName) =>
  `Field '${fieldName}' is invalid or was not provided`;

const validateStringField = (value, fieldName) => {
  if (!value || typeof value != "string" || value.trim().length === 0)
    return formatErrorMessage(fieldName);
};

const validateIntField = (number, fieldName) => {
  if (!Number.isInteger(number) || number < 0)
    return formatErrorMessage(fieldName);
};

const validateUserFields = (name, job) => {
  const errors = [];

  const nameError = validateStringField(name, "name");
  if (nameError) errors.push(nameError);

  const jobError = validateStringField(job, "job");
  if (jobError) errors.push(jobError);

  return errors;
};

module.exports = {
  validateStringField,
  validateUserFields,
  validateIntField,
};
