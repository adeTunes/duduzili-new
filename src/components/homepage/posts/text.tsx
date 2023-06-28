import { Text } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";

function PostText({
  text,
  postId,
  usage,
}: {
  text: string;
  postId?: number;
  usage?: "post" | "comment";
}) {
  function wrapUrlsWithAnchorTags(text) {
    // Regular expression pattern to match potential URLs
    var urlPattern = /\b(https?:\/\/\S+)/gi;

    // Find all potential URLs in the text
    var urls = text.match(urlPattern);

    // Replace each URL with an anchor tag
    if (urls) {
      for (var i = 0; i < urls.length; i++) {
        let url = urls[i];
        let formattedUrl = url.replace(url[0], url[0].toLocaleLowerCase())
        var anchorTag = '<a class="text-duduzili-violet" target="_blank" href="' + formattedUrl + '">' + formattedUrl + "</a>";
        text = text.replace(url, anchorTag);
      }
    }

    return text;
  }

  const [truncate, setTruncate] = useState(true);
  return text?.length < 250 ? (
    <p style={{wordWrap: "break-word"}} className="text-[14px] leading-[38px]">
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
      className=" text-[14px] leading-[38px]"
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
  );
}

export default PostText;
