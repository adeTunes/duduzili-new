import React from "react";
import PostHeader from "./postHeader";
import PostText from "./text";
import PostFooter from "./postFooter";
import PostVideo from "./postVideo";
import { Post } from "../../../../api/request.types";
import PostVideoAndImage from "./postVideoAndImage";
import PostVideoAndAudio from "./postVideoAndAudio";

function PostVideoAndAudioContainer({ post }: { post: Post }) {
  // console.log(post.photo_url);
  return (
    <div
      className="rounded-[24px] bg-white p-8 flex flex-col gap-6"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
    >
      <PostHeader post={post} />
      <PostText text={post.text} postId={post.id} />
      <PostVideoAndAudio
        audioUrl={post?.media?.audio}
        videoUrl={post?.media?.video}
      />
      <PostFooter
        post={post}
        totalComments={post.total_comments}
        totalLikes={post.total_likes}
        totalReposts={post.total_reposts}
        iLikeThisPost={post.i_like_this_post}
      />
    </div>
  );
}

export default PostVideoAndAudioContainer;
