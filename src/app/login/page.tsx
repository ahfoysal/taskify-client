import LoginPage from "@/components/auth/LoginPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login | Taskify",
  description: "Task Management App by Pewds",
};
const Login = () => {
  return <LoginPage />;
};

export default Login;
