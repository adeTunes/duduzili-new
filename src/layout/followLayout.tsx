import Header from "@/components/homepage/header";
import { ArrowLeft } from "iconsax-react";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import { useRouter } from "next/router";
import TrendingPosts from "@/components/homepage/sidebar/trendingPosts";
import DiscoverSuggested from "@/components/discover/discoverSuggested";
import { ReactNode } from "react";

const FollowLayout = ({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) => {
  const { back } = useRouter();
  const { query } = useRouter();
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] h-full overflow-auto py-[50px] relative max-w-[1131px] justify-between w-[80%] mx-auto gap-[50px] flex">
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-w-[717px] flex flex-col gap-[34px]"
          >
            <div
              onClick={back}
              className="flex cursor-pointer items-center gap-10"
            >
              <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
              <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                {query?.user}
              </p>
            </div>
            {children}
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] pb-[80px] overflow-auto max-w-[325px] flex flex-col gap-6"
          >
            <DownloadApp />
            <TrendingPosts />
            <CompanyInfo />
          </aside>
          <FixedMessagesButton />
        </main>
      </div>
    </div>
  );
};

export default FollowLayout;
