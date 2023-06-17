import { useQuery } from "@tanstack/react-query";
import { getAllPosts, getPrivateCommunityRequests } from "../api/apiRequests";
import { Posts } from "../api/request.types";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function useCommunityPendingRequests(code) {
  return useQuery({
    queryKey: ["pending-requests", code],
    queryFn: async () => {
      try {
        const { data } = await getPrivateCommunityRequests(code);
        return data.data;
      } catch (e) {
        errorMessageHandler(e)
        // return e;
      }
    },
    keepPreviousData: true,
    enabled: !!code
  });
}

export default useCommunityPendingRequests;
