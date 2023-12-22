import { Avatar, Button, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AuthContext } from "@/hooks/AuthContextProvider";
import { useRouter } from "next/navigation";

const UserPopoverContent = ({
  user,
  logout,
  router,
  setUser,
}: {
  user: any;
  logout: any;
  router: any;
  setUser: any;
}) => (
  <Button
    style={{
      width: "100%",
      marginTop: "20px",
    }}
    onClick={() =>
      logout()
        .then(() => {
          router.push("/");
          console.log("User logged out");
          router.push("/");
          setUser(null);
        })
        .catch((err: any) => {
          console.error(err);
          router.push("/");
          setUser(null);
        })
    }
  >
    Logout
  </Button>
);

const UserPopover = () => {
  const { user, logout, setUser } = useContext(AuthContext);
  const router = useRouter();

  return (
    <Popover
      content={
        <UserPopoverContent
          user={user}
          router={router}
          setUser={setUser}
          logout={logout}
        />
      }
      placement="bottomRight"
      arrow={false}
      title={user?.name}
    >
      <Avatar
        size={"large"}
        src={user?.avatar}
        icon={<UserOutlined />}
        alt="avatar"
      />
    </Popover>
  );
};

export default UserPopover;
