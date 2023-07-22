import React, { useState } from "react";
import ImageMedia from "@/components/profile/imageMedia";
import VideoMedia from "@/components/profile/videoMedia";
import AudioMedia from "@/components/profile/audioMedia";
import { NextPageX } from "../../../types/next";
import FriendProfileLayout from "@/layout/friendProfileLayout";
import { useAtomValue } from "jotai";
import { friendPersonalDetails } from "@/store";
import EmptyComponent from "@/components/emptyComponent";
import usePostMedia from "../../../hooks/use-post-media";
import GalleryViewer from "@/components/homepage/posts/galleryViewer";
import Head from "next/head";
import { base64decode } from "nodejs-base64";

const ProfileMedia = ({ data }) => {
  const friendDetails: any = useAtomValue(friendPersonalDetails);
  const [opened, setOpened] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const { media } = usePostMedia(friendDetails?.medias);
  const viewedMedia = media.filter((item) => item.type !== "audio");
  const details = data?.user;
  return (
    <>
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
      <FriendProfileLayout>
        {/* {!friendDetails?.user?.is_following &&
        friendDetails?.user?.is_private ? (
          <EmptyComponent
            className="max-w-[275px]"
            text="This is a private account. You will see their content when they accept your follow request"
          />
        ) : ( */}
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
              gallery={
                viewedMedia as { url: string; type: "video" | "photo" }[]
              }
              opened={opened}
            />
          </div>
        {/* )} */}
      </FriendProfileLayout>
    </>
  );
};
export default ProfileMedia;

export async function getServerSideProps({ query }) {
  const axios = require("axios");
  const user = base64decode(query.id);

  try {
    const { data } = await axios({
      baseURL: "https://duduzili-staging-server.com.ng",
      url: `/api/v1/rest-auth/offline_user/${user}/`,
    });
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
