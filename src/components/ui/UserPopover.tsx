import { Avatar, Button, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AuthContext } from "@/hooks/AuthContextProvider";

const UserPopoverContent = ({ user, logout }: { user: any; logout: any }) => (
  <Button
    style={{
      width: "100%",
      marginTop: "20px",
    }}
    onClick={() =>
      logout()
        .then(() => {
          console.log("User logged out");
        })
        .catch((err: any) => {
          console.error(err);
        })
    }
  >
    Logout
  </Button>
);

const UserPopover = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Popover
      content={<UserPopoverContent user={user} logout={logout} />}
      placement="bottomRight"
      arrow={false}
      title={user?.name}
    >
      <Avatar size={"large"} src={user?.avatar} icon={<UserOutlined />} alt="avatar" />
    </Popover>
  );
};

export default UserPopover;
