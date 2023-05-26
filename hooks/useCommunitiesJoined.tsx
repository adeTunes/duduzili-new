import { useQuery } from "@tanstack/react-query";
import { getCommunityJoined } from "../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function useCommunityJoined() {
  return useQuery({
    queryKey: ["communities-joined"],
    queryFn: async () => {
      try {
        const { data } = await getCommunityJoined();
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
