import { useQuery } from "@tanstack/react-query";
import { followersSearch } from "../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function useFollowersSearch(username) {
  return useQuery({
    queryKey: ["followers-search"],
    queryFn: async () => {
      try {
        const { data } = await followersSearch(username);
        return data.data;
      } catch (e) {
        errorMessageHandler(e)
        // return e;
      }
    },
    keepPreviousData: true,
    enabled: !!username
  });
}

export default useFollowersSearch;
