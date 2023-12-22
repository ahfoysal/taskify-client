import type { MenuProps } from "antd";

import { AppstoreAddOutlined , } from "@ant-design/icons";
import Link from "next/link";
export function sidebarItems() {
  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const defaultItems: MenuItem[] = [
    getItem("Tasks", "tasks", <AppstoreAddOutlined />, [
      getItem(<Link href={`/tasks`}>Tasks</Link>, `/tasks`),
      getItem(<Link href={`/tasks/create`}>Create Task</Link>, `/create`),
    ]),
  ];

  return defaultItems;
}
