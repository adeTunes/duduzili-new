import React, { useState } from "react";
import PostText from "../homepage/posts/text";
import PostImage from "../homepage/posts/postImage";
import { Post } from "../../../api/request.types";
import useImageViewer from "../../../hooks/useImageViewer";
import GalleryViewer from "../homepage/posts/galleryViewer";

function CommunityPostBody({ post }: { post: Post }) {
  const [opened, setOpened] = useState(false);

  const { viewerData } = useImageViewer(post);
  const startIndex = 0;
  return (
    <>
      <PostText text={post?.text} postId={post?.id} />
      <PostImage
        handleClick={() => setOpened(true)}
        image={post?.media?.photo?.[0]}
      />
      <GalleryViewer
        setOpened={setOpened}
        startIndex={startIndex}
        gallery={viewerData}
        opened={opened}
      />
    </>
  );
}

export default CommunityPostBody;
