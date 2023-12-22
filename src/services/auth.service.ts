import {
  getFromCookies,
  removeFromCookies,
  setToCookies,
} from "@/utils/cookies";
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  setToCookies("accessToken", accessToken);
  setToLocalStorage("accessToken", accessToken);
};
export const getUserInfo = () => {
  return getFromCookies("accessToken");
};
export const removeUserInfo = () => {
  removeFromLocalStorage("accessToken");
  return removeFromCookies("accessToken");
};
