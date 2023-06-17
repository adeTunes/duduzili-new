import React, { Fragment, useState } from "react";
import CommunityViewCard from "./communityViewCard";
import useCommunityPosts from "../../../hooks/useCommunityPosts";
import { useRouter } from "next/router";
import PostsContainer from "../homepage/posts/postsContainer";
import ReplyInput from "./replies/replyInput";
import ReplyCard from "./replies/replyCard";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import { useDisclosure } from "@mantine/hooks";
import { Icon } from "@iconify/react";
import { AudioSquare } from "iconsax-react";
import CreateCommunityPostModal from "../modals/createCommunityPostModal";
import { showNotification } from "@mantine/notifications";

function CommunityView({ community }) {
  const [limit, setLimit] = useState(20);
  const { query } = useRouter();
  const { data } = useCommunityPosts(limit, query.id);
  const user: any = useAtomValue(userDetails)
  const [opened, {open, close}] = useDisclosure(false)
  return (
    <>
      <CommunityViewCard community={community} />
      {/* <CommunityPost community={community} /> */}
      <div className="grid gap-4 grid-cols-[auto_1fr]">
        <img
          src={
            user?.user?.photo_url?.substring(62) || "/profile-pic-default.png"
          }
          className="w-[56px] h-[56px] rounded-full object-cover"
          alt=""
        />
        <div
          className="bg-white pl-6 pr-5 cursor-pointer py-4 rounded-[32px] grid grid-cols-[1fr_auto] items-center"
          style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
          onClick={() => {
            if(!community?.data?.is_joined) {
              return showNotification({message: "You are not a member of this community", color: "red"})
            } 
            open()
          }}
        >
          <p className="text-[#757575]">Create a post</p>
          <div className="flex items-center max-[400px]:hidden gap-3 ">
            <Icon icon="ic:outline-image" height={24} width={24} />
            <Icon icon="ic:outline-videocam" height={24} width={24} />
            <AudioSquare size="24" variant="Outline" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-[36px]">
          {data?.results?.map((item, idx) => (
            <Fragment key={idx}>
              <PostsContainer post={item?.post} />
              {/* Reply section */}
              {item?.total_comments ? (
                <div className="flex gap-[36px] pl-[90px] flex-col">
                  <ReplyInput />
                  {item?.post?.comments?.length ? (
                    item?.post?.comments
                      ?.map((comment, idx) => (
                        <ReplyCard key={idx} comment={comment} />
                      ))
                      .reverse()
                  ) : (
                    <p className="text-center">No comments here yet</p>
                  )}
                </div>
              ) : null}
            </Fragment>
          ))}
          {!data?.results?.length && (
            <p className="text-center">No posts here yet</p>
          )}
          {/* <p
      role="button"
      className="py-3 ml-[67px] rounded-[32px] border-duduzili-violet border border-solid text-[18px] font-semibold leading-6 text-center text-duduzili-violet"
    >
      Show more
    </p> */}
        </div>
        {/* {posts?.map((post, idx) => (
          <PostsContainer key={idx} post={post} />
        ))} */}
      </div>
      <CreateCommunityPostModal limit={limit} opened={opened} close={close} />
    </>
  );
}

export default CommunityView;
