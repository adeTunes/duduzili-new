import Header from "@/components/homepage/header";
import { ArrowLeft } from "iconsax-react";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import { useRouter } from "next/router";
import TrendingPosts from "@/components/homepage/sidebar/trendingPosts";
import { LoadingOverlay, clsx } from "@mantine/core";
import { useState, useEffect } from "react";
import PostsContainer from "@/components/homepage/posts/postsContainer";
import useSearchResult from "../hooks/use-search-result";
import { useAtomValue } from "jotai";
import { pageSearch } from "@/store";
import PeopleList from "@/components/search/peopleList";
import DiscoverCommunitiesCard from "@/components/communities/discoverCommunitiesCard";
import { Loading } from "@/components/loading";
import MainContainer from "@/components/main-container";

const Search = () => {
  const { back } = useRouter();
  const tags = ["Posts", "People"];
  const [selected, setSelected] = useState(0);
  const queryString = useAtomValue(pageSearch);
  const [queryValue, setQueryValue] = useState(null);
  const { query, pathname } = useRouter();
  const { data, isFetching } = useSearchResult(
    pathname !== "/search" ? String(query?.q) : queryValue
  );

  useEffect(() => {
    if (queryString) {
      setQueryValue(queryString);
    }
  }, [queryString]);

  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <MainContainer>
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-[790px]:flex-1 max-[450px]:min-w-[250px] min-w-[400px] max-w-[717px] flex flex-col gap-[34px]"
          >
            <div
              onClick={back}
              className="flex cursor-pointer items-center gap-[2.5vw]"
            >
              <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
              <p
                style={{
                  fontSize: "clamp(15px, 1.3vw, 24px)",
                }}
                className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold"
              >
                Search
              </p>
            </div>
            <div
              style={{ gap: "clamp(12px, 2vw, 32px)" }}
              className="grid max-[325px]:hidden grid-cols-3"
            >
              {tags.map((item, idx) => (
                <p
                  key={idx}
                  onClick={() => {
                    setSelected(idx);
                  }}
                  className={clsx(
                    selected === idx
                      ? "bg-duduzili-violet font-semibold text-white"
                      : "bg-[#EDF0FB] text-[#2A2A2A]",
                    "py-2 rounded-[40px] text-center leading-6"
                  )}
                  role="button"
                >
                  {item}
                </p>
              ))}
            </div>
            <div className="hidden max-[325px]:grid grid-cols-3">
              {tags?.map((item, idx) => (
                <p
                  onClick={() => setSelected(idx)}
                  key={idx}
                  className={clsx(
                    selected === idx
                      ? "border-b-[3px] border-b-duduzili-violet text-duduzili-violet"
                      : "border-b border-b-[#C0D0E8] text-[#828282]",
                    "pb-2 cursor-pointer text-xs flex justify-center font-semibold leading-6"
                  )}
                >
                  {item}
                </p>
              ))}
            </div>
            {
              selected === 0 ? (
                <div className="flex flex-col gap-8">
                  {data?.search_result?.posts?.map((post, idx) => (
                    <PostsContainer key={idx} post={post} />
                  ))}
                </div>
              ) : (
                <PeopleList data={data?.search_result} query={query} />
              )
              // <div className="flex flex-col gap-[50px] pb-[50px]">
              //   {data?.search_result?.community?.map((item, index) => (
              //     <DiscoverCommunitiesCard key={index} community={item} />
              //   ))}
              // </div>
            }
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] pb-[80px] overflow-auto min-w-[300px] max-w-[400px] max-[790px]:hidden flex flex-col gap-6"
          >
            <DownloadApp />
            <TrendingPosts />
            <CompanyInfo />
          </aside>
          <FixedMessagesButton />
        </MainContainer>
      </div>
      <LoadingOverlay visible={isFetching} />
    </div>
  );
};

export default Search;
