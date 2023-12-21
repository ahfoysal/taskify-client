"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import StyledComponentsRegistry from "./AntdRegistry";
import AuthProvider from "@/hooks/AuthContextProvider";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </AuthProvider>
    </Provider>
  );
};

export default Providers;
