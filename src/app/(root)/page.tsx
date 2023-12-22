import BannerComponent from "@/components/home/Banner";
import Banner from "@/components/home/Banner";
import Explore from "@/components/home/Explore";
import Faq from "@/components/home/Faq";
import Promo from "@/components/home/Promo";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home | Taskify",
  description: "Task Management App by Pewds",
};
const Page = () => {
  return (
    <div className="max-w-7xl w-[93%] mx-auto n">
      <BannerComponent />
      <Promo />
      <Explore />
      <Faq />
    </div>
  );
};

export default Page;
