import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import PostBody from "@/components/homepage/posts/postBody";
import PostwithRepost from "@/components/homepage/postwithRepost";
import { NextPageX } from "../../../types/next";
import FriendProfileLayout from "@/layout/friendProfileLayout";

const MyProfilePost: NextPageX = () => {
  return (
    <div className="flex flex-col gap-10 pb-[50px]">
      <PostBody />
      <PostwithRepost />
    </div>
  );
};

MyProfilePost.Layout = FriendProfileLayout;
export default MyProfilePost;
