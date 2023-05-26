import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../api/apiRequests";
import { SinglePost } from "../api/request.types";

function useSinglePost(id) {
  return useQuery<SinglePost>({
    queryKey: ["single-posts", id],
    queryFn: async () => {
      try {
        const { data } = await getSinglePost(id);
        return data;
      } catch (e) {
        // return e;
      }
    },
    keepPreviousData: true,
    enabled: !!id,
  });
}

export default useSinglePost;
