import { useQuery } from "@tanstack/react-query";
import { getTrendingPosts } from "../api/apiRequests";
import { Post } from "../api/request.types";

function UseTrendingPosts() {
  return useQuery<Array<Post>>({
    queryKey: ["trending-posts"],
    queryFn: async () => {
      try {
        const { data } = await getTrendingPosts();
        return data.trending.post;
      } catch (e) {
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default UseTrendingPosts;
