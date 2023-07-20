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
      <meta
          name="description"
          content="Join Duduzili, the social media app that brings people together. Share your ideas and beliefs without fear of censorship. Empower yourself and control the value of your creations. Start connecting and engaging in diverse conversations today!"
        />
        <meta
          property="og:title"
          content="Duduzili - Uniting People and Empowering Authentic Expression"
        />
        <meta
          property="og:description"
          content="Duduzili is a social media app built for individuals who value authentic expression and want to control the value of their creations. Join us in connecting with others, sharing ideas, and engaging in diverse conversations without the fear of censorship."
        />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/sitelogo.png`} />
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
