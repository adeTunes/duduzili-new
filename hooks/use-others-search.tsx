import { useQuery } from "@tanstack/react-query";
import { otherUsersSearch } from "../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function useOthersSearch(username) {
  return useQuery({
    queryKey: ["others-search"],
    queryFn: async () => {
      try {
        const { data } = await otherUsersSearch(username);
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

export default useOthersSearch;
