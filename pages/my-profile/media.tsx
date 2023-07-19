import React, { useEffect, useMemo, useState } from "react";
import { NextPageX } from "../../types/next";
import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import ImageMedia from "@/components/profile/imageMedia";
import VideoMedia from "@/components/profile/videoMedia";
import AudioMedia from "@/components/profile/audioMedia";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { currentUserDetails, userFollowers, userFollowings } from "@/store";
import usePostMedia from "../../hooks/use-post-media";
import GalleryViewer from "@/components/homepage/posts/galleryViewer";
import { base64decode } from "nodejs-base64";

const ProfileMedia: NextPageX = ({ data }: any) => {
  const [userOnlineActivities, setUserOnlineActivities]: any =
    useAtom(currentUserDetails);
  const setFollowings = useSetAtom(userFollowings);
  const setFollowers = useSetAtom(userFollowers);

  useEffect(() => {
    if (data) {
      setFollowers(data?.followers);
      setFollowings(data?.followings);
      setUserOnlineActivities(data);
    }
  }, [data]);

  const [opened, setOpened] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const { media } = usePostMedia(userOnlineActivities?.medias);
  const viewedMedia = useMemo(
    () => media.filter((item) => item.type !== "audio"),
    [media]
  );

  return (
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
ProfileMedia.Layout = ProfileActivitiesLayout;
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
    };
    const url = `https://duduzili-staging-server.com.ng/api/v1/rest-auth/user/${
      +base64decode(query.user) / 1000000
    }/`;
    const respose = await fetch(url, config);
    const data = await respose.json();
    return {
      props: {
        data,
      },
    };
  } catch (e) {
    console.log("Something went wrong");
    return {
      props: {
        error: JSON.stringify(e),
      },
    };
  }
}
