import { Icon } from "@iconify/react";
import { Heart, MessageText, TicketStar } from "iconsax-react";
import React, { useState } from "react";
import ShareOptions from "./shareOptions";
import { Loading } from "@/components/loading";
import SharedStickersModal from "@/components/modals/sharedStickersModal";
import { useDisclosure } from "@mantine/hooks";
import { likeOrUnlikePost } from "@/actions/postOptionActions";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "@mantine/core";
import Link from "next/link";

function PostFooter({
  totalLikes,
  totalComments,
  totalReposts,
  iLikeThisPost,
  post,
}: {
  totalLikes?: number;
  totalComments?: number;
  totalReposts?: number;
  iLikeThisPost?: boolean;
  post?: any;
}) {
  const [loading, setLoading] = useState(false);
  const [loadActions, setLoadActions] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { pathname, query } = useRouter();
  return (
    <div className="flex items-center justify-between">
      <div className="flex w-[241px] items-center py-3 px-4 gap-10 bg-[#F4F4F4] rounded-[40px]">
        <div
          onClick={() =>
            likeOrUnlikePost(post?.id, setLoadActions, () => {
              if (pathname.includes("home")) {
                queryClient.invalidateQueries(["all-posts"]);
              } else queryClient.invalidateQueries(["single-posts", +query.id]);
            })
          }
          className="flex items-center gap-2"
        >
          {loadActions ? (
            <Loader size="sm" />
          ) : (
            <>
              <Heart
                className="cursor-pointer"
                size="24"
                color={iLikeThisPost ? "#F5597F" : "#000000"}
                variant={iLikeThisPost ? "Bold" : "Outline"}
              />
              <p className=" text-[14px] text-[#2A2A2A] leading-[17px]">
                {totalLikes}
              </p>
            </>
          )}
        </div>
        <Link href={`/posts/${post?.id}`} className="cursor-ponter flex items-center gap-2">
          <MessageText
            className="cursor-pointer"
            size="24"
            color="#2A2A2A"
            variant="Outline"
          />
          <p className=" text-[14px] text-[#2A2A2A] leading-[17px]">
            {totalComments}
          </p>
        </Link>
        <ShareOptions
          setLoading={setLoading}
          post={post}
          totalReposts={totalReposts}
        />
      </div>
      <div
        onClick={open}
        className="bg-[#367EE8] cursor-pointer rounded-[40px] py-2 px-4 flex items-center gap-2"
      >
        <TicketStar size="24" color="white" />
        <p className="text-white">23</p>
      </div>
      <Loading loading={loading} />
      <SharedStickersModal opened={opened} close={close} />
    </div>
  );
}

export default PostFooter;
