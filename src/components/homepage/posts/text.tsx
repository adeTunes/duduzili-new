import { Skeleton, Text } from "@mantine/core";
import axios from "axios";
import { Link21 } from "iconsax-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import YouTube from 'react-youtube';

function PostText({
  text,
  postId,
  usage,
}: {
  text: string;
  postId?: number;
  usage?: "post" | "comment";
}) {
  const [preview, setPreview] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const extractVideoId = (link) => {
    // Extract the video ID from the YouTube link
    // Example link formats:
    // https://www.youtube.com/watch?v=VIDEO_ID
    // https://youtu.be/VIDEO_ID
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|user\/\S+|attribution_link\/\S+|embed\/videoseries\?list=)|youtu\.be\/)([\w-]{11})(?:\S+)?$/;
    const match = link.match(regex);

    if (match) {
      return match[1];
    }

    return null;
  };
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    var urlPattern = /\b(https?:\/\/\S+)/gi;
    var urls = text.match(urlPattern);
    let extractedVideoId;
    if (urls?.length) {
      urls.forEach((el) => {
        extractedVideoId = extractVideoId(el);
        if (extractVideoId) {
          return;
        }
      });
      if (extractedVideoId) {
        setVideoId(extractedVideoId);
      } else {
        if (urls?.[0]) {
          setPreviewLoading(true);
          axios
            .post("https://getlinkpreview.onrender.com/", { url: urls?.[0] })
            .then(({ data }) => {
              setPreview({ ...data, ogUrl: data?.ogUrl || urls?.[0] });
              setPreviewLoading(false);
            })
            .catch((e) => {
              setPreviewLoading(false);
              console.log(e);
            });
        }
      }
    }
  }, [text]);

  function wrapUrlsWithAnchorTags(text) {
    // Regular expression pattern to match potential URLs
    var urlPattern = /\b(https?:\/\/\S+)/gi;

    // Find all potential URLs in the text
    var urls = text.match(urlPattern);
    // Replace each URL with an anchor tag
    if (urls) {
      for (var i = 0; i < urls.length; i++) {
        let url = urls[i];
        let formattedUrl = url.replace(url[0], url[0].toLocaleLowerCase());
        var anchorTag =
          '<a class="text-duduzili-violet hover:underline" target="_blank" href="' +
          formattedUrl +
          '">' +
          formattedUrl +
          "</a>";
        text = text.replace(url, anchorTag);
      }
    }

    return text;
  }

  const [truncate, setTruncate] = useState(true);
  return (
    <div className="flex flex-col gap-2">
      {text?.length < 250 ? (
        <p style={{ wordWrap: "break-word" }} className="text-[14px] leading-6">
          {usage === "post" ? (
            <Link href={`/posts/${postId}`} className="cursor-ponter">
              <Text lineClamp={6}>{text}</Text>
            </Link>
          ) : (
            <span
              dangerouslySetInnerHTML={{ __html: wrapUrlsWithAnchorTags(text) }}
            ></span>
          )}
        </p>
      ) : (
        <p
          style={{ height: "max-content", transition: "height 2s" }}
          className=" text-[14px] leading-6"
        >
          {truncate ? (
            <span>
              {text?.slice(0, 250)}
              ...
              <span
                className="ml-[5px] text-duduzili-violet font-semibold cursor-pointer"
                onClick={() => {
                  setTruncate(false);
                }}
              >
                Read more
              </span>
            </span>
          ) : (
            <span>
              {text}
              <span
                className="ml-[5px] text-duduzili-violet font-semibold cursor-pointer"
                onClick={() => {
                  setTruncate(true);
                }}
              >
                Hide
              </span>
            </span>
          )}
        </p>
      )}

      {videoId ? (
        <YouTube
          videoId={videoId}
          opts={{
            width: "100%",
            playerVars: {
              autoplay: 0,
            },
          }}
        />
      ) : previewLoading ? (
        <div className="min-h-[100px] w-full grid grid-cols-[100px,1fr] rounded-lg items-center gap-3 bg-[#EDF0FB]">
          <Skeleton className="w-full h-full" />
          <div className="p-2 flex flex-col gap-1">
            <Skeleton height={12} width="100%" />
            <Skeleton height={12} width="100%" />
            <Skeleton height={12} width="20%" />
          </div>
        </div>
      ) : preview ? (
        <div className="flex w-full">
          <a
            href={preview?.ogUrl}
            className="grid w-full min-h-[100px] grid-cols-[100px,1fr] h-max rounded-lg items-center gap-3 bg-[#EDF0FB]"
            target="_blank"
          >
            {preview?.image ? (
              <img
                className="h-full object-cover rounded-l-lg"
                src={preview?.image}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Link21 size="24" variant="Bold" />
              </div>
            )}
            <div className="p-2 flex flex-col gap-1">
              <div className="font-semibold max-[550px]:text-sm text-base">
                {preview?.title}
              </div>
              <Text
                lineClamp={2}
                className=" font-normal max-[550px]:text-[10px] text-sm"
              >
                {preview?.description}
              </Text>
              <div className=" font-normal max-[550px]:text-[8px] text-xs">
                {preview?.domain}
              </div>
            </div>
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default PostText;
