import { Icon } from "@iconify/react";
import { Heart, MessageText, TicketStar } from "iconsax-react";
import React, { useState } from "react";
import ShareOptions from "./shareOptions";
import { Loading } from "@/components/loading";
import SharedStickersModal from "@/components/modals/sharedStickersModal";
import { useDisclosure } from "@mantine/hooks";

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
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center py-3 px-4 gap-10 bg-[#F4F4F4] rounded-[40px]">
        <div className="flex items-center gap-2">
          <Heart
            className="cursor-pointer"
            size="24"
            color={iLikeThisPost ? "#F5597F" : "#000000"}
            variant={iLikeThisPost ? "Bold" : "Outline"}
          />
          <p className=" text-[14px] text-[#2A2A2A] leading-[17px]">
            {totalLikes}
          </p>
        </div>
        <div className="flex items-center gap-2">
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
