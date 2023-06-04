import { useQuery } from "@tanstack/react-query";
import { getAllPosts, getPrivateCommunityRequests } from "../api/apiRequests";
import { Posts } from "../api/request.types";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function useCommunityPendingRequests() {
  return useQuery({
    queryKey: ["pending-requests"],
    queryFn: async () => {
      try {
        const { data } = await getPrivateCommunityRequests();
        return data.data;
      } catch (e) {
        errorMessageHandler(e)
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default useCommunityPendingRequests;
