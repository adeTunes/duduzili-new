import React, { useState } from "react";
import { Post } from "../../../api/request.types";
import RepostParent from "./reposts/repostParent";
import PostText from "./posts/text";
import PostImage from "./posts/postImage";
import PostAudio from "./posts/postAudio";
import PostVideo from "./posts/postVideo";
import PostVideoAndImage from "./posts/postVideoAndImage";
import PostVideoAndAudio from "./posts/postVideoAndAudio";
import PostManyImages from "../communities/postManyImages";
import GalleryViewer from "./posts/galleryViewer";
import useImageViewer from "../../../hooks/useImageViewer";
import RepostBody from "./reposts/repostBody";

function RepostsContainer({ post }: { post: Post }) {
  

  return (
    <RepostParent post={post}>
      {!post?.media?.audio &&
      !post?.youtube_url &&
      !post?.media?.video &&
      !post?.media?.photo?.length &&
      post?.text ? (
        <PostText text={post?.text} postId={post?.id} />
      ) : !post?.youtube_url &&
        !post?.media?.video &&
        post?.media?.photo?.length === 1 &&
        post?.text ? (
        <RepostBody post={post} />
      ) : post?.media?.audio &&
        post?.text &&
        !post?.media?.video &&
        !post?.media?.photo?.length ? (
        <>
          <PostText text={post.text} postId={post.id} />
          <PostAudio
            audioUrl={post?.media?.audio}
            photoUrl="/community-default.png"
          />
        </>
      ) : post?.media?.video &&
        !post?.media?.audio &&
        post?.text &&
        !post?.media?.photo?.length ? (
        <>
          <PostText text={post.text} postId={post.id} />
          <PostVideo
            photoUrl={post?.media?.photo?.[0]}
            videoUrl={post?.media?.video}
          />
        </>
      ) : post?.media?.video &&
        post?.media?.photo?.length === 1 &&
        post?.text &&
        !post?.media?.audio ? (
        <>
          <PostText text={post.text} postId={post.id} />
          <PostVideoAndImage
            photoUrl={post?.media?.photo?.[0]}
            videoUrl={post?.media?.video}
          />
        </>
      ) : post?.media?.video &&
        !post?.media?.photo?.length &&
        post?.text &&
        post?.media?.audio ? (
        <>
          <PostText text={post.text} postId={post.id} />
          <PostVideoAndAudio
            audioUrl={post?.media?.audio}
            videoUrl={post?.media?.video}
          />
        </>
      ) : post?.media?.photo?.length > 1 ? (
        <>
          <PostText text={post.text} postId={post.id} />
          <PostManyImages post={post} />
        </>
      ) : post?.youtube_url && post?.text ? (
        <>
          <PostText text={post.text} postId={post.id} />
          <PostVideo
            photoUrl={post?.media?.photo?.[0]}
            videoUrl={post?.media?.video}
          />
        </>
      ) : null}
    </RepostParent>
  );
}

export default RepostsContainer;
