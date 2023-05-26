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
              {!item?.audio &&
              !item?.video &&
              !item?.photo ? null : item?.photo &&
                !item?.video &&
                !item?.audio ? (
                <Gallery size="16" color="#757575" variant="Outline" />
              ) : !item?.photo && item?.video && !item?.audio ? (
                <VideoSquare size="16" color="#757575" variant="Outline" />
              ) : !item?.photo && !item?.video && item?.audio ? (
                <AudioSquare size="16" color="#757575" variant="Outline" />
              ) : item?.photo && item?.video && !item?.audio ? (
                <>
                  <Gallery size="16" color="#757575" variant="Outline" />
                  <VideoSquare size="16" color="#757575" variant="Outline" />
                </>
              ) : item?.photo && !item?.video && item?.audio ? (
                <>
                  <Gallery size="16" color="#757575" variant="Outline" />
                  <AudioSquare size="16" color="#757575" variant="Outline" />
                </>
              ) : !item?.photo && item?.video && item?.audio ? (
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
