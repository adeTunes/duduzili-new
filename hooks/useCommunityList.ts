import { useQuery } from "@tanstack/react-query";
import { getAllPosts, getCommunityCategoryList, getCommunityList } from "../api/apiRequests";
import { CommunityCategoryType, CommunityListData } from "../api/request.types";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function useCommunityList(category) {
  return useQuery<CommunityListData>({
    queryKey: ["all-communities", category],
    queryFn: async () => {
      try {
        const { data } = await getCommunityList(category);
        return data;
      } catch (e) {
        errorMessageHandler(e)
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default useCommunityList;
