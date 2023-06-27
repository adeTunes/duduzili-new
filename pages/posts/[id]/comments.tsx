import ReplyCard from "@/components/communities/replies/replyCard";
import ReplyInput from "@/components/communities/replies/replyInput";
import { useRouter } from "next/router";
import React from "react";
import useSinglePost from "../../../hooks/useSinglePost";
import Header from "@/components/homepage/header";
import { ArrowLeft } from "iconsax-react";
import Aside from "@/components/homepage/sidebar";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import MainContainer from "@/components/main-container";

function Comments() {
  const { query } = useRouter();
  const { data, refetch } = useSinglePost(query.id);
  const { back } = useRouter();
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <MainContainer>
          <section
            id="no-scroll"
            className="w-[70%] max-[790px]:flex-1 max-[450px]:min-w-[250px] min-w-[400px] max-w-[690px] overflow-auto flex flex-col gap-[56px]"
          >
            <div className="flex items-center gap-10">
              <ArrowLeft
                onClick={back}
                className="cursor-pointer"
                size="32"
                color="#2A2A2A"
                variant="Outline"
              />
              <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                Comments
              </p>
            </div>
            {data?.comments?.length ? (
              <>
                {data?.comments
                  ?.map((comment, idx) => (
                    <ReplyCard key={idx} comment={comment} />
                  ))
                  .reverse()}
                <p
                  role="button"
                  className="py-3 ml-[67px] cursor-pointer rounded-[32px] border-duduzili-violet border border-solid text-[18px] font-semibold leading-6 text-center text-duduzili-violet"
                >
                  Show more
                </p>
                <ReplyInput refetch={refetch} />
              </>
            ) : (
              <p className="text-center">No comments here yet</p>
            )}
          </section>
          <Aside />
          <FixedMessagesButton />
        </MainContainer>
      </div>
    </div>
  );
}

export default Comments;
