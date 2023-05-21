import { likeOrUnlikeComment } from "@/actions/commentActions";
import { Icon } from "@iconify/react";
import { Heart, MessageText } from "iconsax-react";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {Loader} from "@mantine/core"

function CommunityPostTooltip({ comment }) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { query } = useRouter();
  return (
    <div className="flex items-center py-3 px-4 w-fit gap-10 bg-[#F4F4F4] rounded-[40px]">
      <div
        onClick={() =>
          likeOrUnlikeComment(comment?.id, setLoading, () => {
            queryClient.invalidateQueries(["single-posts", +query.id]);
          })
        }
        className="flex items-center cursor-pointer gap-2"
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <Heart
              size="24"
              color={comment?.i_like_this_comment ? "#F5597F" : "#2A2A2A"}
              variant={comment?.i_like_this_comment ? "Bold" : "Outline"}
            />
            <p className=" text-[14px] text-[#2A2A2A] leading-[17px]">
              {comment?.total_number_of_likes}
            </p>
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        <MessageText size="24" color="#2A2A2A" variant="Outline" />
        <p className=" text-[14px] text-[#2A2A2A] leading-[17px]">
          {comment?.total_number_of_replies}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Icon
          icon="material-symbols:google-plus-reshare"
          height={24}
          width={24}
          color="#2a2a2a"
        />
        <p className=" text-[14px] text-[#2A2A2A] leading-[17px]">107</p>
      </div>
    </div>
  );
}

export default CommunityPostTooltip;
