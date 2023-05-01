import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import { NextPageX } from "../../types/next";
import PostBody from "@/components/homepage/posts/postBody";
import PostwithRepost from "@/components/homepage/postwithRepost";

const Draft: NextPageX = () => {
  return (
    <div className="flex flex-col gap-10 pb-[50px]">
      <PostBody />
      <PostwithRepost />
    </div>
  );
};

Draft.Layout = ProfileActivitiesLayout;
export default Draft;
