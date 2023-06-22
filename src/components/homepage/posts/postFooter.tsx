import { Heart, MessageText, TicketStar } from "iconsax-react";
import React, { useState, useEffect } from "react";
import ShareOptions from "./shareOptions";
import { Loading } from "@/components/loading";
import SharedStickersModal from "@/components/modals/sharedStickersModal";
import { useDisclosure } from "@mantine/hooks";
import { likeOrUnlikePost } from "@/actions/postOptionActions";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { Loader, clsx } from "@mantine/core";
import { useAtomValue, useSetAtom } from "jotai";
import { stickerAwardee, userDetails } from "@/store";
import { UnAuthenticaticatedUserModal } from "@/components/modals/unAuthenticatedUserModal";

import RewardStickersModal from "@/components/modals/rewardStickerModal";
import RewardStickerSuccess from "@/components/modals/rewardStickerSuccess";
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
  const [rewardOpened, { open: openReward, close: closeReward }] =
    useDisclosure(false);
  const [successOpened, { open: openSuccess, close: closeSuccess }] =
    useDisclosure(false);
  const queryClient = useQueryClient();
  const { pathname, query } = useRouter();
  const user: any = useAtomValue(userDetails);
  const router = useRouter();
  const [openAuthModal, setOpenAuth] = useState(false);
  const [sticker, setSticker] = useState([]);
  const setStickerAwardee = useSetAtom(stickerAwardee);

  useEffect(() => {
    if (post?.stickers) {
      setSticker(Object.values(post?.stickers) as number[]);
    }
  }, [post]);

  const handleStickers = () => {
    if (!user?.token) return setOpenAuth(true);
    if (sticker?.length && post?.user?.id === user?.user?.id) {
      open();
    } else if (post?.user?.id !== user?.user?.id) {
      setStickerAwardee(post?.user);
      openReward();
    }
  };

  return !router.pathname.includes("/communities/") ? (
    <div className="flex items-center justify-between">
      <div className="flex w-fit max-[480px]:w-fit items-center py-3 px-4 gap-10 max-[480px]:gap-5 max-[292px]:gap-3 bg-[#F4F4F4] rounded-[40px]">
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
          className="flex items-center cursor-pointer gap-2"
        >
          {loadActions ? (
            <Loader size="sm" />
          ) : (
            <>
              <Heart
                className="max-[360px]:w-[16px] max-[360px]:h-[16px]"
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
            const id = +post?.id * 1000000
            router.push(`/posts/${base64encode(id)}`);
          }}
          className="cursor-pointer flex items-center gap-2"
        >
          <MessageText
            className="max-[360px]:w-[16px] max-[360px]:h-[16px]"
            color="#2A2A2A"
            variant="Outline"
          />
          <p className=" text-[14px] text-[#2A2A2A] leading-[17px]">
            {totalComments}
          </p>
        </div>
        {!post?.is_repost ? (
          <ShareOptions post={post} totalReposts={totalReposts} />
        ) : null}
      </div>
      {router.pathname === "/communities/posts" ? null : (
        <div
          onClick={handleStickers}
          className={clsx(
            (sticker?.length && post?.user?.id === user?.user?.id) ||
              post?.user?.id !== user?.user?.id
              ? "cursor-pointer"
              : "",
            "bg-[#367EE8] rounded-[40px] py-2 px-4 flex items-center gap-2"
          )}
        >
          <TicketStar
            className="max-[360px]:w-[16px] max-[360px]:h-[16px]"
            color="white"
          />
          <p className="text-white">{sticker.length}</p>
        </div>
      )}
      <Loading loading={loading} />
      <SharedStickersModal
        stickerUsers={post?.sticker_user}
        sticker={sticker}
        opened={opened}
        close={close}
      />
      <RewardStickersModal
        postId={post?.id}
        openSuccess={openSuccess}
        opened={rewardOpened}
        close={closeReward}
      />
      <RewardStickerSuccess opened={successOpened} close={closeSuccess} />
      <UnAuthenticaticatedUserModal
        opened={openAuthModal}
        setOpened={setOpenAuth}
      />
    </div>
  ) : null;
}

export default PostFooter;
