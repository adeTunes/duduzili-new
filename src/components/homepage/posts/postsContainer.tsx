import React from "react";
import { Post } from "../../../../api/request.types";
import PostWithAudio from "./postAudioOnly";
import PostWithVideo from "./postWithVideo";
import PostBody from "./postBody";
import PostTextOnly from "./postTextOnly";
import PostVideoAndImageContainer from "./postVideoAndImageContainer";
import PostVideoAndAudioContainer from "./postVideoAudioContainer";
import PostManyImagesContainer from "./postManyImagesContainer";
import PostwithRepost from "../postwithRepost";

function PostsContainer({ post }: { post: Post }) {
  return post?.is_repost ? (
    <PostwithRepost post={post} />
  ) : !post?.media?.audio &&
    !post?.media?.video &&
    !post?.media?.photo?.length &&
    post?.text ? (
    <PostTextOnly post={post} />
  ) :
    !post?.media?.video &&
    post?.media?.photo?.length === 1 &&
    post?.text ? (
    <PostBody post={post} />
  ) : post?.media?.audio &&
    post?.text &&
    !post?.media?.video &&
    !post?.media?.photo?.length ? (
    <PostWithAudio post={post} />
  ) : post?.media?.video &&
    !post?.media?.audio &&
    post?.text &&
    !post?.media?.photo?.length ? (
    <PostWithVideo post={post} />
  ) : post?.media?.video &&
    post?.media?.photo?.length === 1 &&
    post?.text &&
    !post?.media?.audio ? (
    <PostVideoAndImageContainer post={post} />
  ) : post?.media?.video &&
    !post?.media?.photo?.length &&
    post?.text &&
    post?.media?.audio ? (
    <PostVideoAndAudioContainer post={post} />
  ) : post?.media?.photo?.length > 1 ? (
    <PostManyImagesContainer post={post} />
  ) : null;
}

export default PostsContainer;
