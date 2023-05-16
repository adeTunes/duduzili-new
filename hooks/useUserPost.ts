import { useQuery } from "@tanstack/react-query";
import { getUserPostWithUrl } from "../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function useUserPost(url) {
  return useQuery({
    queryKey: ["user-post"],
    queryFn: async () => {
      try {
        const { data } = await getUserPostWithUrl(url);
        return data;
      } catch (e) {
        // return e;
        errorMessageHandler(e);
      }
    },
    keepPreviousData: true,
  });
}

export default useUserPost;
