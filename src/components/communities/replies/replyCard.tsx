import React, { useEffect, useState } from "react";
import CommentAudio from "@/components/homepage/posts/commentAudio";
import CommentVideo from "@/components/homepage/posts/commentVideo";
import { likeOrUnlikeComment } from "@/actions/commentActions";
import { Loader } from "@mantine/core";
import { Heart } from "iconsax-react";
import PostText from "@/components/homepage/posts/text";
import PostImage from "@/components/homepage/posts/postImage";
import DefaultProfilePicture from "@/components/profile/defaultProfilePicture";
import { Icon } from "@iconify/react";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";

function ReplyCard({ comment, refetch }: { comment: any; refetch?: any }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dayjs.extend(LocalizedFormat);
  });

  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex self-start gap-[19px] items-center">
          {comment?.user?.photo_url ? (
            <img
              src={comment?.user?.photo_url}
              className="w-[48px] h-[48px] max-[500px]:w-8 max-[500px]:h-8 rounded-full object-cover"
              alt=""
            />
          ) : (
            <DefaultProfilePicture
              text="text-[100%]"
              className="!w-[48px] !h-[48px]"
              firstName={comment?.user?.first_name}
              lastName={comment?.user?.last_name}
            />
          )}
          <p className=" font-semibold max-[390px]:text-base text-[18px] flex flex-col gap-1 justify-between leading-6 text-[#2A2A2A]">
            <span>
              {comment?.user?.first_name} {comment?.user?.last_name}
            </span>
            <span className="flex items-center text-[#686868] h-3 text-[10px] gap-[5px]">
              <small className="pr-[5px] border-r leading-normal border-r-[#686868]">
                {comment?.date_added ? dayjs(comment?.date_added).format("MMM D") : null}
              </small>
              <small className="leading-normal">{comment?.date_added ? dayjs(comment?.date_added).format("h:mm A ") : null}</small>
            </span>
          </p>
        </div>
        <Icon
          icon="solar:menu-dots-bold"
          rotate={1}
          className="cursor-pointer w-6 h-6 max-[350px]:w-[18px] max-[350px]:h-[18px]"
        />
      </div>
      <div
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
        className="ml-[67px] max-[400px]:p-3 rounded-2xl p-6 flex flex-col gap-2 bg-white"
      >
        {!comment?.audio &&
        !comment?.youtube_url &&
        !comment?.video &&
        !comment?.photo &&
        comment?.content ? (
          <p className="text-[14px] leading-[38px]">{comment?.content}</p>
        ) : !comment?.audio &&
          !comment?.youtube_url &&
          !comment?.video &&
          comment?.photo &&
          comment?.content ? (
          <>
            <PostText text={comment?.content} postId={comment?.id} />
            <PostImage image={comment?.photo} />
          </>
        ) : comment?.audio &&
          !comment?.youtube_url &&
          !comment?.video &&
          !comment?.photo &&
          comment?.content ? (
          <CommentAudio comment={comment} />
        ) : !comment?.audio &&
          !comment?.youtube_url &&
          comment?.video &&
          !comment?.photo &&
          comment?.content ? (
          <CommentVideo comment={comment} />
        ) : null}
        {/* ) : comment?.audio && comment?.text ? (
           <CommentAudio comment={comment} />
         ) : comment?.video_url && comment?.text ? (
           <CommentVideo comment={comment} />
         ) : comment?.youtube_url && comment?.text ? (
           <CommentVideo comment={comment} />
         ) : null} */}
        <div className="flex items-center py-2 px-4 w-fit gap-10 bg-[#F4F4F4] rounded-[40px]">
          <div
            onClick={() =>
              likeOrUnlikeComment(comment?.id, setLoading, () => {
                refetch();
              })
            }
            className="flex items-center cursor-pointer gap-3"
          >
            {loading ? (
              <Loader size="sm" />
            ) : (
              <>
                <Heart
                  size="18"
                  color={comment?.i_like_this_comment ? "#F5597F" : "#2A2A2A"}
                  variant={comment?.i_like_this_comment ? "Bold" : "Outline"}
                />
                <p className=" text-[14px] text-[#2A2A2A] leading-[17px]">
                  {comment?.total_number_of_likes}
                </p>
              </>
            )}
          </div>
          {/* <div className="flex items-center gap-2">
        <MessageText size="24" color="#2A2A2A" variant="Outline" />
        <p className=" text-[14px] text-[#2A2A2A] leading-[17px]">
          {comment?.total_number_of_replies}
        </p>
      </div> */}
          {/* <div className="flex items-center gap-2">
            <Icon
              icon="material-symbols:google-plus-reshare"
              height={24}
              width={24}
              color="#2a2a2a"
            />
            <p className=" text-[14px] text-[#2A2A2A] leading-[17px]">107</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ReplyCard;
