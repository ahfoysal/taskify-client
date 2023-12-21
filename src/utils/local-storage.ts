export const setToLocalStorage = (key: string, value: any) => {
  if (!key || typeof window === undefined) return "";
  localStorage.setItem(key, value);
};
