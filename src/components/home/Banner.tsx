"use client";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

const BannerComponent = () => {
  return (
    <div className="min-h-[600px] flex justify-center  items-center md:flex-row flex-col gap-4 ">
      <div className=" lg:max-w-xl mx-auto text-center md:text-left flex flex-col gap-4">
        <h1 className="text-5xl font-bold">
          Manage your task from your{" "}
          <span className="text-[#D34936]">Browser</span>
        </h1>
        <p className="text-lg text-light-black">
          Become focused, organized, and calm with Taskify.
        </p>
        <Link href={"/login"}>
          <Button
            style={{
              backgroundColor: "#D34936",
              marginTop: "20px",
              color: "white",
            }}
            size="large"
          >
            Let’s Explore
          </Button>
        </Link>
      </div>
     <div>
     <Image src={"/banner.png"  } className="w-full h-full" alt="banner" height={600} width={600} />
     </div>
    </div>
  );
};

export default BannerComponent;
