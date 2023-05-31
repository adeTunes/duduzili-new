import { useQuery } from "@tanstack/react-query";
import { getCommunityPosts, getSinglePost } from "../api/apiRequests";
import { SinglePost } from "../api/request.types";

function useCommunityPosts(limit, code) {
  return useQuery({
    queryKey: ["community-posts", limit, code],
    queryFn: async () => {
      try {
        const { data } = await getCommunityPosts(limit, code);
        return data.data;
      } catch (e) {
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default useCommunityPosts;
