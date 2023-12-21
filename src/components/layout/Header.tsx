import { Layout, Row, theme } from "antd";
import React from "react";
import UserPopover from "../ui/UserPopover";
const { Header: AntHeader } = Layout;

const Header = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <AntHeader style={{ color: "white",   background: colorBgContainer,
    borderRadius: borderRadiusLG, }}>
      <Row justify={"end"} align={"middle"} style={{ height: "100%" }}>
        <UserPopover />
      </Row>
    </AntHeader>
  );
};

export default Header;
