import React, { useMemo, useState } from "react";
import { NextPageX } from "../../types/next";
import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import ImageMedia from "@/components/profile/imageMedia";
import VideoMedia from "@/components/profile/videoMedia";
import AudioMedia from "@/components/profile/audioMedia";
import { useAtomValue } from "jotai";
import { currentUserDetails } from "@/store";
import usePostMedia from "../../hooks/use-post-media";
import GalleryViewer from "@/components/homepage/posts/galleryViewer";
import { base64decode } from "nodejs-base64";
import Head from "next/head";

const ProfileMedia: NextPageX = ({data}: any) => {
  const details = data?.user
  const userOnlineActivities: any = useAtomValue(currentUserDetails);
  const [opened, setOpened] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const { media } = usePostMedia(userOnlineActivities?.medias);
  const viewedMedia = useMemo(
    () => media.filter((item) => item.type !== "audio"),
    [media]
  );

  return (
    <ProfileActivitiesLayout>
      <Head>
        <title>
          {`Duduzili | ${details?.first_name} ${details?.last_name}`}
        </title>
        <meta
          property="og:title"
          content={`${details?.first_name} ${details?.last_name}`}
        />
        <meta property="og:description" content={details?.bio} />
        <meta name="description" content={details?.bio} />
        <meta
          property="og:image"
          content={
            details?.photo_url ||
            `${process.env.NEXT_PUBLIC_SITE_URL}/sitelogo.png`
          }
        />
      </Head>
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
    </ProfileActivitiesLayout>
  );
};
export default ProfileMedia;

export async function getServerSideProps({ query, req }) {
  const axios = require("axios");
  const { parse } = require("cookie");
  const user = base64decode(query.user);
  const obj = parse(req.headers.cookie);

  try {
    const { data } = await axios({
      baseURL: "https://duduzili-staging-server.com.ng",
      url: `/api/v1/rest-auth/user/${user}/`,
      headers: {
        Authorization: `Token ${obj["duduzili-user"]}`,
      },
    });
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log("something went wrong");
    return {
      notFound: true,
    };
  }
}
