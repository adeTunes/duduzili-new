import React from "react";
import CommunityViewCard from "./communityViewCard";
import PostWithComments from "./postWithComments";

function CommunityView() {
  return (
    <>
      <CommunityViewCard communityMember={false} />
      <PostWithComments />
    </>
  );
}

export default CommunityView;
