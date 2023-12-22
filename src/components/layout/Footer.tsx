"use client";
import { motion } from "framer-motion";
import { Divider } from "antd";
import Link from "next/link";
import { Icons } from "@/asstets/Icons";
import { LinkedinFilled } from "@ant-design/icons";
import Image from "next/image";

const FooterComponent = () => {
  return (
    <footer className="  max-w-7xl w-[93%] mx-auto">
      <div className="  py-10 gap-10 lg:gap-0   flex justify-between">
        <div className="md:flex-row flex-col flex gap-10 items-center">
          <Link
            href={"/"}
            style={{ color: "black" }}
            className="flex items-center  text-[#D34936] justify-center text-2xl font-semibold"
          >
            Taskify
          </Link>
        </div>
        <div className="flex gap-8 justify-center " style={{ color: "black" }}>
          <Link style={{ color: "black" }} href={"https://www.facebook.com/"}>
            <Icons.facebookIcon className=" h-6 w-6" />
          </Link>
          <Link style={{ color: "black" }} href={"https://youtube.com/"}>
            {" "}
            <Icons.youtubeIcon className=" h-6 w-6" />{" "}
          </Link>

          <Link
            style={{ color: "black" }}
            href={"https://www.linkedin.com/in/"}
          >
            {" "}
            <LinkedinFilled className=" h-6 text-black text-2xl w-6" />{" "}
          </Link>
        </div>
      </div>

      <Divider className="mb-8 bg-divider" />

      <div className="pb-8 flex flex-col md:flex-row  gap-4 justify-between items-center ">
        <p className="text-tiny  text-light-50  text-center">
          2023 <span className=" hover:text-danger"> Pewds. </span> All right
          reserved.
        </p>
        <ul
          style={{ color: "black" }}
          className=" list-none flex justify-center flex-wrap items-center   gap-4"
        >
          {[
            { name: "Privacy Policy", path: "privacy-policy" },

            { name: "Terms of Service", path: "tos" },
            { name: "Cookies Settings", path: "cookies-settings" },
          ].map((el, index) => {
            return (
              <Link
                key={index}
                href={`/${el?.path}`}
                className="text-light-black"
                style={{ color: "black" }}
              >
                <motion.li
                  variants={hoverVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className=" cursor-pointer text-light-black  text-tiny  underline underline-offset-1"
                >
                  {el.name}
                </motion.li>
              </Link>
            );
          })}
        </ul>
      </div>
    </footer>
  );
};

export default FooterComponent;
const hoverVariants = {
  hidden: {
    opacity: 0,
    x: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
  hover: {
    scale: [1, 1.06, 1, 1.06, 1],
    originX: 0,
    color: "#D34936",
  },
};
