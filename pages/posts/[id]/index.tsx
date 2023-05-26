import PostWithComments from "@/components/communities/postWithComments";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import Aside from "@/components/homepage/sidebar";
import React from "react";
import { useRouter } from "next/router";
import { ArrowLeft } from "iconsax-react";

function ViewPost() {
  const { back } = useRouter();

  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] h-full overflow-auto pb-[50px] relative max-w-[1131px] justify-between pt-[50px] w-[80%] mx-auto gap-[50px] flex">
          <section
            id="no-scroll"
            className="w-[70%] max-w-[690px] overflow-auto flex flex-col gap-[56px]"
          >
            <div className="flex items-center gap-10">
              <ArrowLeft onClick={back} className="cursor-pointer" size="32" color="#2A2A2A" variant="Outline" />
              <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                View Post
              </p>
            </div>
            <div className="flex flex-col gap-[36px]">
              <PostWithComments />
            </div>
          </section>
          <Aside />
          <FixedMessagesButton />
        </main>
      </div>
    </div>
  );
}

export default ViewPost;