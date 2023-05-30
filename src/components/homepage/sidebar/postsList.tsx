import { Icon } from "@iconify/react";
import React from "react";
import TrendingPostsContainer from "./trendingPosts/trendingPostsContainer";
import { AudioSquare, Gallery, VideoSquare } from "iconsax-react";
import UseTrendingPosts from "../../../../hooks/useTrendingPosts";

function PostsList() {
  const { data } = UseTrendingPosts();
  return (
    <div className="flex flex-col gap-2">
      {data?.map(
        (item, index) =>
          index < 10 && (
            <TrendingPostsContainer
              key={index}
              post={item}
            >
              {!item?.media?.audio &&
              !item?.media?.video &&
              !item?.media?.photo?.length ? null : item?.media?.photo?.length &&
                !item?.media?.video &&
                !item?.media?.audio ? (
                <Gallery size="16" color="#757575" variant="Outline" />
              ) : !item?.media?.photo?.length && item?.media?.video && !item?.media?.audio ? (
                <VideoSquare size="16" color="#757575" variant="Outline" />
              ) : !item?.media?.photo?.length && !item?.media?.video && item?.media?.audio ? (
                <AudioSquare size="16" color="#757575" variant="Outline" />
              ) : item?.media?.photo?.length && item?.media?.video && !item?.media?.audio ? (
                <>
                  <Gallery size="16" color="#757575" variant="Outline" />
                  <VideoSquare size="16" color="#757575" variant="Outline" />
                </>
              ) : item?.media?.photo?.length && !item?.media?.video && item?.media?.audio ? (
                <>
                  <Gallery size="16" color="#757575" variant="Outline" />
                  <AudioSquare size="16" color="#757575" variant="Outline" />
                </>
              ) : !item?.media?.photo?.length && item?.media?.video && item?.media?.audio ? (
                <>
                  <VideoSquare size="16" color="#757575" variant="Outline" />
                  <AudioSquare size="16" color="#757575" variant="Outline" />
                </>
              ) : null}
            </TrendingPostsContainer>
          )
      )}
      {/* <TrendingPostsContainer>
        <VideoSquare size="16" color="#757575" variant="Outline" />
        <AudioSquare size="16" color="#757575" variant="Outline" />
      </TrendingPostsContainer>
      <TrendingPostsContainer>
        <Gallery size="16" color="#757575" variant="Outline" />
        <AudioSquare size="16" color="#757575" variant="Outline" />
      </TrendingPostsContainer> */}
    </div>
  );
}

export default PostsList;
