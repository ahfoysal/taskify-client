"use client";
import React, { useContext } from "react";
import { Breadcrumb, Button, Col, Layout, Menu, Row, theme } from "antd";
import { AuthContext } from "@/hooks/AuthContextProvider";
import UserPopover from "../ui/UserPopover";
import Link from "next/link";
import Image from "next/image";
import FooterComponent from "./Footer";

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: "",
    label: `Home`,
  },
  {
    key: "about",
    label: `About`,
  },

  {
    key: "pricing",
    label: `Pricing`,
  },
];

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { user, logout } = useContext(AuthContext);

  return (
    <Layout>
  <div className="">
  <Header
        style={{
          display: "flex",
          background: "#121219",
          alignItems: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
      <div className="max-w-7xl w-[93%] mx-auto ">
      <Row
          style={{ width: "100%" }}
          align={"middle"}
          justify={"space-between"}
        >
          <Col>
            <Link href={"/"}>
              {" "}
              <Image src={"/logo.png"} alt="logo" width={100} height={60} />
            </Link>
          </Col>
          <Col>
            <ul className="text-white flex gap-4">
              {items.map((item) => (
                <li key={item.key}>
                  <Link className="text-white" href={`/${item.key}`}>
                    {" "}
                    {item.label}
                  </Link>
                </li>
              ))}
              {user && (
                <>
                  <li>
                    <Link className="text-white" href={`/tasks`}>
                      Tasks
                    </Link>
                  </li>
                  <li>
                    <Link className="text-white" href={`/tasks/create`}>
                      Create Task{" "}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </Col>
          {user ? (
            <Col>
              <UserPopover />
            </Col>
          ) : (
            <Col>
              <Link href={"/login"}>
                <Button className="text-white">Sign In</Button>
              </Link>
            </Col>
          )}
        </Row>
      </div>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div>{children}</div>
      </Content>
      <FooterComponent />
  </div>
    </Layout>
  );
};

export default RootLayout;
