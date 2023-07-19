import React, { useEffect, useState } from "react";
import ImageMedia from "@/components/profile/imageMedia";
import VideoMedia from "@/components/profile/videoMedia";
import AudioMedia from "@/components/profile/audioMedia";
import { NextPageX } from "../../../types/next";
import FriendProfileLayout from "@/layout/friendProfileLayout";
import { useAtomValue, useSetAtom } from "jotai";
import { friendPersonalDetails } from "@/store";
import EmptyComponent from "@/components/emptyComponent";
import usePostMedia from "../../../hooks/use-post-media";
import GalleryViewer from "@/components/homepage/posts/galleryViewer";

const ProfileMedia: NextPageX = ({data}: any) => {
  const [opened, setOpened] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  
  const friendDetails: any = useAtomValue(friendPersonalDetails);
  const setFriendDetails = useSetAtom(friendPersonalDetails);
  
  const { media } = usePostMedia(friendDetails?.medias);
  const viewedMedia = media.filter((item) => item.type !== "audio");

  useEffect(() => {
    if (data) {
      setFriendDetails(data);
    }
  }, [data]);

  return !friendDetails?.user?.is_following &&
    friendDetails?.user?.is_private ? (
    <EmptyComponent
      className="max-w-[275px]"
      text="This is a private account. You will see their content when they accept your follow request"
    />
  ) : (
    <div
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(134.8px, 1fr))",
      }}
      className="grid gap-[9px]"
    >
      {media.map(({ type, url }, idx) =>
        type === "audio" ? (
          <AudioMedia key={idx} audioUrl={url} />
        ) : type === "video" ? (
          <VideoMedia
            handleClick={() => {
              setOpened(true);
              setStartIndex(idx);
            }}
            key={idx}
            videoUrl={url}
          />
        ) : (
          <ImageMedia
            handleClick={() => {
              setOpened(true);
              setStartIndex(idx);
            }}
            key={idx}
            image={url}
          />
        )
      )}
      <GalleryViewer
        setOpened={setOpened}
        startIndex={startIndex}
        gallery={viewedMedia as { url: string; type: "video" | "photo" }[]}
        opened={opened}
      />
    </div>
  );
};
ProfileMedia.Layout = FriendProfileLayout;
export default ProfileMedia;

export async function getServerSideProps(context) {
  const { query, req } = context;
  const querystring = require("node:querystring");

  const obj = querystring.parse(req.headers.cookie);
  try {
    const config = {
      headers: {
        authorization: `Token ${obj["duduzili-user"]}`,
      },
    }
    const url = `https://duduzili-staging-server.com.ng/api/v1/rest-auth/user/${query.id}/`
    const respose = await fetch(url, config);
    const data = await respose.json();
    return {
      props: {
        data,
      },
    };
  } catch (e) {
    return {
      props: {
        error: JSON.stringify(e),
      },
    };
  }
}