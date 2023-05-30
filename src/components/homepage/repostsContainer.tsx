import React from "react";
import { Post } from "../../../api/request.types";
import RepostTextOnly from "./repostTextOnly";
import RepostTextWithAudio from "./repostTextWithAudio";
import RepostTextWithVideo from "./repostTextWithViideo";
import RepostParent from "./reposts/repostParent";
import PostText from "./posts/text";
import PostImage from "./posts/postImage";
import PostAudio from "./posts/postAudio";
import PostVideo from "./posts/postVideo";
import PostVideoAndImage from "./posts/postVideoAndImage";
import PostVideoAndAudio from "./posts/postVideoAndAudio";
import PostManyImages from "../communities/postManyImages";

function RepostsContainer({ post }: { post: Post }) {
  // return !post?.audio &&
  //   !post?.video &&
  //   !post?.youtube_url &&
  //   !post?.photo &&
  //   post?.text ? (
  //   <RepostTextOnly post={post} />
  // ) : post?.audio && post?.text ? (
  //   <RepostTextWithAudio post={post} />
  // ) : post?.video_url && post?.text ? (
  //   <RepostTextWithVideo post={post} />
  // ) : post?.youtube_url && post?.text ? (
  //   <RepostTextWithVideo post={post} />
  // ) : null;
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
        <>
          <PostText text={post.text} postId={post.id} />
          <PostImage image={post?.media?.photo?.[0]} />
        </>
      ) : post?.media?.audio &&
        post?.text &&
        !post?.media?.video &&
        !post?.media?.photo?.length ? (
        <>
          <PostText text={post.text} postId={post.id} />
          <PostAudio
            audioUrl={post?.media?.audio}
            photoUrl="/cover-image.png"
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
