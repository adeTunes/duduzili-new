import { useQuery } from "@tanstack/react-query";
import { communityMembers } from "../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function useCommunityMembers(code) {
  return useQuery({
    queryKey: ["community-members"],
    queryFn: async () => {
      try {
        const { data } = await communityMembers(code);
        return data.data;
      } catch (e) {
        errorMessageHandler(e)
        // return e;
      }
    },
    enabled: !!code,
    keepPreviousData: true,
  });
}

export default useCommunityMembers;
