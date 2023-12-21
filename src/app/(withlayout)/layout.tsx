import DashboardBar from "@/components/layout/DashboardBar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardBar>{children}</DashboardBar>;
};

export default DashboardLayout;
