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

const Search = () => {
  const { back } = useRouter();
  const tags = ["Posts", "People", "Community"];
  const [selected, setSelected] = useState(0);
  const queryString = useAtomValue(pageSearch);
  const [queryValue, setQueryValue] = useState(null);
  const {query, pathname} = useRouter()
  const { data, isFetching } = useSearchResult(pathname !== "/search" ? String(query?.q) : queryValue);

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
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] h-full overflow-auto py-[50px] relative max-w-[1131px] justify-between w-[80%] mx-auto gap-[50px] flex">
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-w-[717px] flex flex-col gap-[34px]"
          >
            <div
              onClick={back}
              className="flex cursor-pointer items-center gap-10"
            >
              <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
              <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                Search
              </p>
            </div>
            <div className="grid gap-8 grid-cols-3">
              {tags.map((item, idx) => (
                <p key={idx}
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
            {selected === 0 ? (
              <div className="flex flex-col gap-8">
                {data?.search_result?.posts?.map((post, idx) => (
                  <PostsContainer key={idx} post={post} />
                ))}
              </div>
            ) : selected === 1 ? (
              <PeopleList data={data?.search_result} query={query} />
            ) : (
              <div className="flex flex-col gap-[50px] pb-[50px]">
                {data?.search_result?.community?.map((item, index) => (
                  <DiscoverCommunitiesCard key={index} community={item} />
                ))}
              </div>
            )}
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] pb-[80px] overflow-auto max-w-[325px] flex flex-col gap-6"
          >
            <DownloadApp />
            <TrendingPosts />
            <CompanyInfo />
          </aside>
          <FixedMessagesButton />
        </main>
      </div>
      <LoadingOverlay visible={isFetching} />
    </div>
  );
};

export default Search;
