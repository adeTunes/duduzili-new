import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../api/apiRequests";
import { Posts } from "../api/request.types";

function useAllPosts() {
  return useQuery<Posts>({
    queryKey: ["all-posts"],
    queryFn: async () => {
      try {
        const { data } = await getAllPosts();
        return data;
      } catch (e) {
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default useAllPosts;
