import SignUpPage from "@/components/auth/SignupPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up | Taskify",
  description: "Task Management App by Pewds",
};
const SignUp = () => {
  return <SignUpPage />;
};

export default SignUp;
