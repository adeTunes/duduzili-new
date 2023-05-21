import { useQuery } from "@tanstack/react-query";
import { getAllPosts, getCommunityCategoryList } from "../api/apiRequests";
import { CommunityCategoryType } from "../api/request.types";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function useCommunityCategoryList() {
  return useQuery<CommunityCategoryType>({
    queryKey: ["all-community-categories"],
    queryFn: async () => {
      try {
        const { data } = await getCommunityCategoryList();
        return data.data;
      } catch (e) {
        errorMessageHandler(e)
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default useCommunityCategoryList;
