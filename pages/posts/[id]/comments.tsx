import ReplyCard from "@/components/communities/replies/replyCard";
import ReplyInput from "@/components/communities/replies/replyInput";
import { useRouter } from "next/router";
import React from "react";
import useSinglePost from "../../../hooks/useSinglePost";
import Header from "@/components/homepage/header";
import { ArrowLeft } from "iconsax-react";
import Aside from "@/components/homepage/sidebar";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import { base64decode } from "nodejs-base64";

function Comments() {
  const { query } = useRouter();
  const { data } = useSinglePost(+base64decode(String(query.id))/1000000);
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
                <ReplyInput />
              </>
            ) : (
              <p className="text-center">No comments here yet</p>
            )}
          </section>
          <Aside />
          <FixedMessagesButton />
        </main>
      </div>
    </div>
  );
}

export default Comments;
