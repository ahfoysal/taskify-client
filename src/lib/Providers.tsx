"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import StyledComponentsRegistry from "./AntdRegistry";
import AuthProvider from "@/hooks/AuthContextProvider";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      once: false,
      mirror: true,
      disable: "mobile",
    });
  });
  return (
    <Provider store={store}>
      <AuthProvider>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </AuthProvider>
    </Provider>
  );
};

export default Providers;
