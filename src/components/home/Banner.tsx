import { Button } from "antd";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <div className="max-w-xl mx-auto text-center flex flex-col gap-4">
        <h1 className="text-6xl font-bold">
          Manage your task from your{" "}
          <span className="text-[#D34936]">Browser</span>
        </h1>
        <p className="text-lg text-light-black">
          Become focused, organized, and calm with Taskify.
        </p>
        <Link href={"/login"}>
          {" "}
          <Button
            style={{
              backgroundColor: "#D34936",
              marginTop: "20px",
              color: "white",
            }}
          >
            Let’s Explore
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default Banner;
