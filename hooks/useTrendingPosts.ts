import { useQuery } from "@tanstack/react-query";
import { getAllPosts, getTrendingPosts } from "../api/apiRequests";
import { Posts } from "../api/request.types";

function UseTrendingPosts() {
  return useQuery<Posts>({
    queryKey: ["trending-posts"],
    queryFn: async () => {
      try {
        const { data } = await getTrendingPosts();
        return data;
      } catch (e) {
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default UseTrendingPosts;
