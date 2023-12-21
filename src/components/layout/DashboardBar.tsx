"use client";
import React, { useEffect, useState, useContext } from "react";

import { Collapse, Layout, Menu, theme } from "antd";
import SideBar from "./Sider";
import BreadCrumbs from "../ui/BreadCrumbs";
import { getUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/hooks/AuthContextProvider";
import Header from "./Header";
import Loading from "@/app/loading";

const { Content, Footer } = Layout;

const DashboardBar = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { user, loginChecking } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loginChecking && !user) {
      router.replace("/login");
      console.log("not logged in.");
    }
    if (user) {
      console.log("logged in");
    }
  }, [user, router, loginChecking]);
  const [collapsed, setCollapsed] = useState(false);

  if (!user) {
    return <Loading />;
  }
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header />
        <BreadCrumbs />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Taskify ©2023 Created by Pewds
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardBar;
