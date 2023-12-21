export const getErrorMessageByPropertyName = (
  errors: Record<string, any>,
  name: string
) => {
  const property = name.split(".");
  let value = errors;
  for (let prop of property) {
    if (value[prop]) {
      value = value[prop];
    } else return undefined;
  }
  return value.message;
};
