import RootLayout from "@/components/layout/RootLayout";
import React from "react";

const RootLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return <RootLayout>{children}</RootLayout>;
};

export default RootLayoutPage;
