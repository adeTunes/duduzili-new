import React from "react";
import CommunityViewCard from "./communityViewCard";
import PostWithComments from "./postWithComments";
import CommunityPost from "./communityPosts";

function CommunityView() {
  return (
    <>
      <CommunityViewCard communityMember={false} />
      <CommunityPost />
    </>
  );
}

export default CommunityView;
