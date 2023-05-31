import { useQuery } from "@tanstack/react-query";
import { getCommunityJoined } from "../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function useCommunityJoined(limit) {
  return useQuery({
    queryKey: ["communities-joined", limit],
    queryFn: async () => {
      try {
        const { data } = await getCommunityJoined(limit);
        return data;
      } catch (e) {
        errorMessageHandler(e)
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default useCommunityJoined;
