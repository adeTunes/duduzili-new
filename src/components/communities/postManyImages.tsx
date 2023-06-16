import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { Post } from "../../../api/request.types";
import PostAudio from "../homepage/posts/postAudio";
import PostVideo from "../homepage/posts/postVideo";
import GalleryViewer from "../homepage/posts/galleryViewer";
import useImageViewer from "../../../hooks/useImageViewer";
import { Carousel } from "@mantine/carousel";

function PostManyImages({ post }: { post: Post }) {
  const [media, setMedia] = useState([]);
  const [opened, setOpened] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  useEffect(() => {
    setMedia(
      Object.entries(post?.media).reduce((acc, [key, value]: any, idx) => {
        if (key === "video")
          acc.push(({ gridSpan }: { gridSpan?: string }) => (
            <PostVideo
              gridSpan={gridSpan}
              height="h-[156px]"
              videoUrl={post?.media?.video}
            />
          ));
        else if (key === "audio")
          acc.push(({ gridSpan }: { gridSpan?: string }) => (
            <PostAudio
              gridSpan={gridSpan}
              height="h-[156px]"
              audioUrl={post?.media?.audio}
              photoUrl="/cover-image.png"
            />
          ));
        else {
          value.forEach((item) => {
            acc.push(({ gridSpan }: { gridSpan?: string }) => (
              <div style={{ gridColumn: gridSpan }} className="h-[156px]">
                <img
                  src={item}
                  className="h-full cursor-pointer w-full object-cover rounded-2xl"
                  alt="post image"
                />
              </div>
            ));
          });
        }
        return acc;
      }, [])
    );
  }, []);

  const { viewerData } = useImageViewer(post);

  return (
    <>
      <div className="grid max-[390px]:hidden grid-cols-[1fr_1fr] gap-2">
        {media?.map((Item, idx) =>
          media.length <= 4 ? (
            <Item
              key={idx}
              gridSpan={media.length === 3 && idx === 2 ? "1/3" : ""}
            />
          ) : (
            idx < 3 && <Item key={idx} />
          )
        )}
        {media?.length > 4 &&
          media?.map(
            (Item, idx) =>
              idx === 3 && (
                <div
                  key={idx}
                  onClick={() => {
                    setStartIndex(0);
                    setOpened(true);
                  }}
                  className="relative h-[156px] cursor-pointer"
                >
                  <div className="absolute rounded-2xl top-0 left-0 bottom-0 right-0 bg-black opacity-40"></div>
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <p className="text-white text-[48px] leading-[58px] z-50">
                      +{media?.length - 4}
                    </p>
                  </div>
                  <Item />
                </div>
              )
          )}
        <GalleryViewer
          setOpened={setOpened}
          startIndex={startIndex}
          gallery={viewerData}
          opened={opened}
        />
      </div>
      <Carousel
        maw={320}
        mx="auto"
        withIndicators
        className="max-[390px]:block hidden"
        height={200}
        dragFree
        slideGap="md"
        align="start"
      >
        {media?.map((Item, idx) => (
          <Carousel.Slide key={idx}>
            <Item key={idx} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}

export default PostManyImages;
