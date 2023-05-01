import PostWithComments from "@/components/communities/postWithComments";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import Aside from "@/components/homepage/sidebar";
import React from "react";

function ViewPost() {
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] pb-[50px] relative max-w-[1121px] justify-between mt-[50px] w-[80%] mx-auto gap-[50px] flex">
          <section className="w-[70%] max-w-[718px] flex flex-col gap-[56px]">
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
