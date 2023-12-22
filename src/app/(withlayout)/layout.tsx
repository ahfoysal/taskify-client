import DashboardBar from "@/components/layout/DashboardBar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | Taskify",
  description: "Task Management App by Pewds",
};
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardBar>{children}</DashboardBar>;
};

export default DashboardLayout;
