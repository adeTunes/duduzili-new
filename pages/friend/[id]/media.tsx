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

const ProfileMedia: NextPageX = () => {
  const friendDetails: any = useAtomValue(friendPersonalDetails);
  const [opened, setOpened] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const { media } = usePostMedia(friendDetails?.medias);
  const viewedMedia = media.filter((item) => item.type !== "audio");

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Join Duduzili, the social media app that brings people together. Share your ideas and beliefs without fear of censorship. Empower yourself and control the value of your creations. Start connecting and engaging in diverse conversations today!"
        />
        <meta
          property="og:title"
          content="Duduzili - Uniting People and Empowering Authentic Expression"
        />
        <meta
          property="og:description"
          content="Duduzili is a social media app built for individuals who value authentic expression and want to control the value of their creations. Join us in connecting with others, sharing ideas, and engaging in diverse conversations without the fear of censorship."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/sitelogo.png`}
        />
      </Head>
      {!friendDetails?.user?.is_following && friendDetails?.user?.is_private ? (
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
      )}
      ;
    </>
  );
};
ProfileMedia.Layout = FriendProfileLayout;
export default ProfileMedia;
