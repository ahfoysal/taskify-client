"use client";
import React from "react";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

import { sidebarItems } from "@/constants/sidebarItems";
import Link from "next/link";
import Image from "next/image";

const SideBar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: any;
}) => {
  const padding = collapsed ? "50px" : "0px";
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="60px"
      collapsible
      collapsed={collapsed}
      // width={280}
      onCollapse={(value) => setCollapsed(value)}
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      style={{
        overflow: "hidden",
        position: "sticky",
        left: 0,
        top: 0,
        paddingTop: padding,
        background: "#121219",
        bottom: 0,
        minHeight: "100vh",
        maxHeight: "100vh",
      }}
    >
      {!collapsed && (
        <div className="flex justify-center  py-4 items-center ">
          <Link href={"/"}>
            <Image src={"/logo.png"} alt="logo" width={100} height={60} />
          </Link>{" "}
        </div>
      )}
      <Menu
        theme="dark"
        color="#D34936"
        mode="vertical"
        defaultSelectedKeys={["1"]}
        items={sidebarItems()}
      />
    </Sider>
  );
};

export default SideBar;
