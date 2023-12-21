import {
  getFromCookies,
  removeFromCookies,
  setToCookies,
} from "@/utils/cookies";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  setToCookies("accessToken", accessToken);
};
export const getUserInfo = () => {
  return getFromCookies("accessToken");
};
export const removeUserInfo = () => {
  return removeFromCookies("accessToken");
};
