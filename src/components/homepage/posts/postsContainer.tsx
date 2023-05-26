import React from "react";
import { Post } from "../../../../api/request.types";
import PostWithAudio from "./postAudioOnly";
import PostWithVideo from "./postWithVideo";
import PostBody from "./postBody";
import PostTextOnly from "./postTextOnly";
import PostVideoAndImage from "./postVideoAndImage";
import PostVideoAndImageContainer from "./postVideoAndImageContainer";

function PostsContainer({ post }: { post: Post }) {
  return !post?.audio &&
    !post?.youtube_url &&
    !post?.video &&
    !post?.photo &&
    post?.text ? (
    <PostTextOnly post={post} />
  ) : post?.audio && post?.text ? (
    <PostWithAudio post={post} />
  ) : post?.video_url && post?.text && !post?.photo ? (
    <PostWithVideo post={post} />
  ) : post?.video && post?.photo && post?.text ? (
    <PostVideoAndImageContainer post={post} />
  ) : post?.youtube_url && post?.text ? (
    <PostWithVideo post={post} />
  ) : null;
}

export default PostsContainer;
