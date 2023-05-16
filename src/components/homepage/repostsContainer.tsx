import React from "react";
import { Post } from "../../../api/request.types";
import RepostTextOnly from "./repostTextOnly";
import RepostTextWithAudio from "./repostTextWithAudio";
import RepostTextWithVideo from "./repostTextWithViideo";

function RepostsContainer({ post }: { post: Post }) {
  return !post?.audio &&
    !post?.video &&
    !post?.youtube_url &&
    !post?.photo &&
    post?.text ? (
    <RepostTextOnly post={post} />
  ) : post?.audio && post?.text ? (
    <RepostTextWithAudio post={post} />
  ) : post?.video_url && post?.text ? (
    <RepostTextWithVideo post={post} />
  ) : post?.youtube_url && post?.text ? (
    <RepostTextWithVideo post={post} />
  ) : null;
}

export default RepostsContainer;
