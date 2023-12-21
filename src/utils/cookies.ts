import Cookies from "js-cookie";

export const setToCookies = (key: string, value: any) => {
  if (!key || typeof window === undefined) return "";

  return Cookies.set(key, value);
};
export const getFromCookies = (key: string) => {
  if (!key || typeof window === undefined) return "";

  return Cookies.get(key);
};
export const removeFromCookies = (key: string) => {
  if (!key || typeof window === undefined) return "";

  return Cookies.remove(key);
};
