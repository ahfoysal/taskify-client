"use client";
import { Suspense, createContext } from "react";
import { ReactNode } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import toast from "react-hot-toast";
import { app } from "@/firebase/firebase.config";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { useMeQuery } from "@/redux/api/authApi";

export const AuthContext = createContext<{
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  logout: () => Promise<void>;
  loginChecking: boolean;
  setLoginChecking: React.Dispatch<React.SetStateAction<boolean>>;
  googleSignIn: () => Promise<UserCredential | undefined>;
}>({
  user: null,
  setUser: (() => {}) as React.Dispatch<React.SetStateAction<IUser | null>>,
  logout: async (): Promise<void> => {},
  loginChecking: false,
  setLoginChecking: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
  googleSignIn: async (): Promise<UserCredential | undefined> => {
    return undefined;
  },
});
export interface IUser {
  name: string;
  email: string;
  avatar: string;
  password: string;
  id: string;
  _id: string;
  bloodGroup: string;
  district: string;
  upazila: string;
  role: string;
  userStatus: string;
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loginChecking, setLoginChecking] = useState(true);
  const token = getUserInfo();

  const googleSignIn = async (): Promise<UserCredential | undefined> => {
    setLoginChecking(false);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      return result;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Error signing in with Google");
      setUser(null);
      return undefined;
    }
  };

  const { data, isSuccess, isError } = useMeQuery("");
  useEffect(() => {
    if (isSuccess) {
      setUser(data?.user);
      setLoginChecking(false);
    } else {
      // setLoginChecking(false)

      setUser(null);
    }
    if (isError) {
      setLoginChecking(false);

      console.log("not logged in");
      setUser(null);
    }
  }, [isSuccess, data, isError]);

  const authInfo = {
    user,
    setUser: setUser as React.Dispatch<React.SetStateAction<IUser | null>>,
    googleSignIn,
    logout: async (): Promise<void> => {
      // Provide a default implementation or leave it empty
      // Cookies.remove("accessToken");
      removeUserInfo();
      setUser(null);
      setLoginChecking(false);
    },
    loginChecking,
    setLoginChecking,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
