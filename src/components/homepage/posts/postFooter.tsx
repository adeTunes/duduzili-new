import { Icon } from "@iconify/react";
import { Heart, MessageText, TicketStar } from "iconsax-react";
import React, { useState, useEffect } from "react";
import ShareOptions from "./shareOptions";
import { Loading } from "@/components/loading";
import SharedStickersModal from "@/components/modals/sharedStickersModal";
import { useDisclosure } from "@mantine/hooks";
import { likeOrUnlikePost } from "@/actions/postOptionActions";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "@mantine/core";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import { UnAuthenticaticatedUserModal } from "@/components/modals/unAuthenticatedUserModal";
import { base64encode } from "nodejs-base64";

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
  const user: any = useAtomValue(userDetails);
  const router = useRouter();
  const [openAuthModal, setOpenAuth] = useState(false);
  const [sticker, setSticker] = useState([]);

  useEffect(() => {
    if (post?.stickers) {
      setSticker(Object.values(post?.stickers) as number[]);
    }
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div className="flex w-[241px] items-center py-3 px-4 gap-10 bg-[#F4F4F4] rounded-[40px]">
        <div
          onClick={() => {
            if (!user?.token) return setOpenAuth(true);
            likeOrUnlikePost(post?.id, setLoadActions, () => {
              if (pathname.includes("home")) {
                queryClient.invalidateQueries(["all-posts"]);
                queryClient.invalidateQueries(["trending-posts"]);
              } else queryClient.invalidateQueries(["single-posts", query.id]);
            });
          }}
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
        <div
          onClick={() => {
            if (!user?.token) return setOpenAuth(true);
            router.push(`/posts/${base64encode(String(1000000 * +post?.id))}`);
          }}
          className="cursor-ponter flex items-center gap-2"
        >
          <MessageText
            className="cursor-pointer"
            size="24"
            color="#2A2A2A"
            variant="Outline"
          />
          <p className=" text-[14px] text-[#2A2A2A] leading-[17px]">
            {totalComments}
          </p>
        </div>
        <ShareOptions post={post} totalReposts={totalReposts} />
      </div>
      {router.pathname === "/communities/posts" ? null : (
        <div
          onClick={open}
          className="bg-[#367EE8] cursor-pointer rounded-[40px] py-2 px-4 flex items-center gap-2"
        >
          <TicketStar size="24" color="white" />
          <p className="text-white">{sticker.length}</p>
        </div>
      )}
      <Loading loading={loading} />
      <SharedStickersModal sticker={sticker} opened={opened} close={close} />
      <UnAuthenticaticatedUserModal
        opened={openAuthModal}
        setOpened={setOpenAuth}
      />
    </div>
  );
}

export default PostFooter;
