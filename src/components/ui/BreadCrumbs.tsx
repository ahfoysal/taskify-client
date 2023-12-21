"use client";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadCrumbs = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  function capitalizeFirstLetter(str: string) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  }
  return (
    <Breadcrumb
      style={{
        margin: "20px 30px  0px 30px",
      }}
      items={[
        {
          title: <Link href={"/"}> Home</Link>,
        },
        ...pathNames.map((item) => {
          return {
            title: (
              <Link style={{ color: "black" }} href={"/" + item}>
                {capitalizeFirstLetter(item)}
              </Link>
            ),
          };
        }),
      ]}
    />
  );
};

export default BreadCrumbs;
