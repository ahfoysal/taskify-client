"use client";
import React, { useContext } from "react";
import { Breadcrumb, Button, Col, Layout, Menu, Row, theme } from "antd";
import { AuthContext } from "@/hooks/AuthContextProvider";
import UserPopover from "../ui/UserPopover";
import Link from "next/link";
import Image from "next/image";
import FooterComponent from "./Footer";
import { motion } from "framer-motion";

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

  {
    key: "team",
    label: `Team`,
  },
];

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { user, logout } = useContext(AuthContext);

  return (
    <Layout >
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
                <motion.div
                  className="flex justify-center "
                  initial="hidden"
                  animate="visible"
                  variants={logoVariant}
                >
                  <Link href={"/"}>
                    {" "}
                    <Image
                      src={"/logo.png"}
                      alt="logo"
                      width={100}
                      height={60}
                    />
                  </Link>
                </motion.div>
              </Col>
              <Col>
                <motion.div
                  initial="hidden"
                  className=" gap-6 hidden md:flex"
                  animate="visible"
                  variants={menuVariant}
                >
                  <ul className="text-white flex gap-4">
                    {items.map((item) => (
                      <motion.div key={item.key} variants={childVariant}>
                        <li key={item.key}>
                          <Link className="text-white" href={`/${item.key}`}>
                            {" "}
                            {item.label}
                          </Link>
                        </li>
                      </motion.div>
                    ))}
                    {user && (
                      <>
                        <motion.div variants={childVariant}>
                          <li>
                            <Link className="text-white" href={`/tasks`}>
                              Tasks
                            </Link>
                          </li>
                        </motion.div>
                        <motion.div variants={childVariant}>
                          <li>
                            <Link className="text-white" href={`/tasks/create`}>
                              Create Task{" "}
                            </Link>
                          </li>
                        </motion.div>
                      </>
                    )}
                  </ul>
                </motion.div>
              </Col>
              <motion.div
                className="flex justify-center "
                initial="hidden"
                animate="visible"
                variants={logoVariant}
              >
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
              </motion.div>
            </Row>
          </div>
        </Header>
        <Content >
          <div>{children}</div>
        </Content>
        <FooterComponent />
      </div>
    </Layout>
  );
};

export default RootLayout;
const logoVariant = {
  hidden: {
    y: -100,
  },
  visible: {
    y: 0,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 80,
    },
  },
};
const menuVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const childVariant = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,

    transition: {
      duration: 1,
    },
  },
};
