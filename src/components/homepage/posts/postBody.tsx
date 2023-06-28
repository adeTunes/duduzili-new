import React, { useState } from "react";
import PostText from "./text";
import PostFooter from "./postFooter";
import PostHeader from "./postHeader";
import PostImage from "./postImage";
import { Post } from "../../../../api/request.types";
import GalleryViewer from "./galleryViewer";
import useImageViewer from "../../../../hooks/useImageViewer";

function PostBody({ post }: { post: Post }) {
  const [opened, setOpened] = useState(false);

  const { viewerData } = useImageViewer(post);
  const startIndex = 0;
  return (
    <div
      className="rounded-[24px] max-[500px]:p-[10px] bg-white p-8 flex flex-col gap-6"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
    >
      <PostHeader post={post} />
      <PostText text={post?.text} postId={post?.id} />
      <PostImage
        handleClick={() => setOpened(true)}
        image={post?.media?.photo?.[0]}
      />
      <PostFooter
        post={post}
        totalComments={post?.total_comments}
        totalLikes={post?.total_likes}
        totalReposts={post?.total_reposts}
        iLikeThisPost={post?.i_like_this_post}
      />
      <GalleryViewer
        setOpened={setOpened}
        startIndex={startIndex}
        gallery={viewerData}
        opened={opened}
      />
    </div>
  );
}

export default PostBody;
