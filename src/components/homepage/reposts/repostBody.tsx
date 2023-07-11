import React, { useState } from "react";
import PostText from "../posts/text";
import PostImage from "../posts/postImage";
import useImageViewer from "../../../../hooks/useImageViewer";
import GalleryViewer from "../posts/galleryViewer";

function RepostBody({ post, height }: { height?: string; post: any }) {
  const [opened, setOpened] = useState(false);
  const startIndex = 0;

  const { viewerData } = useImageViewer(post);

  return (
    <>
      <PostText text={post.text} postId={post.id} />
      <PostImage
        height={height}
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

export default RepostBody;
