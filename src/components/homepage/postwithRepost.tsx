import React from "react";
import PostHeader from "./posts/postHeader";
import PostText from "./posts/text";
import PostFooter from "./posts/postFooter";
import { Icon } from "@iconify/react";

function PostwithRepost() {
  return (
    <div
      className="rounded-[24px] bg-white p-8 flex flex-col gap-6"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
    >
      <PostHeader />
      <hr className="w-full bg-[#EDF0FB]" />
      <div className="flex gap-4 items-center">
        <Icon
          icon="material-symbols:google-plus-reshare"
          height={18}
          width={18}
          color="#757575"
        />
        <div className="flex items-center gap-2">
          <div className="h-[48px] w-[48px]">
            <img
              src="/homePage/user-image.png"
              className="w-full h-full object-cover rounded-full"
              alt="user profile picture"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-[#2A2A2A] font-medium ">
              John Doe
            </p>
            <span className="flex items-center gap-1">
              <small className="text-[#757575] text-[10px]">Dec 4</small>
              <span className="bg-[#2A2A2A] text-white text-[10px] px-2 rounded-2xl py-1">
                2d ago
              </span>
            </span>
          </div>
        </div>
      </div>
      <PostText />
      <PostFooter />
    </div>
  );
}

export default PostwithRepost;
