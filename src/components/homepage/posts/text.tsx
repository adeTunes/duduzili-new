import Link from "next/link";
import React, { useState } from "react";
import {base64encode} from "nodejs-base64"

function PostText({
  text,
  postId,
  usage,
}: {
  text: string;
  postId?: number;
  usage?: "post" | "comment";
}) {
  const [truncate, setTruncate] = useState(true);
  return text?.length < 250 ? (
    <p className="text-[14px] leading-[38px]">
      {!usage || usage === "post" ? (
        <Link href={`/posts/${base64encode(String(1000000 * +postId))}`} className="cursor-ponter">
          {text}
        </Link>
      ) : (
        text
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
