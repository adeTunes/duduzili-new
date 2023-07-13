import PostWithComments from "@/components/communities/postWithComments";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import Aside from "@/components/homepage/sidebar";
import React from "react";
import Back from "@/components/back";
import MainContainer from "@/components/main-container";
import Head from "next/head";

function ViewPost() {
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <Head>
        <title>Duduzili | Post</title>
      </Head>
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <MainContainer>
          <section
            id="no-scroll"
            className="w-[70%] max-[790px]:flex-1 max-[450px]:min-w-[250px] min-w-[400px] max-w-[690px] overflow-auto flex flex-col gap-[3vh]"
          >
            <Back text="View Post" />
            <div className="flex flex-col gap-[36px]">
              <PostWithComments />
            </div>
          </section>
          <Aside />
          <FixedMessagesButton />
        </MainContainer>
      </div>
    </div>
  );
}

export default ViewPost;
