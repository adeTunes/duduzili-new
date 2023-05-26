import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../api/apiRequests";
import { Media } from "../api/request.types";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function useUserActivities(id) {
  return useQuery({
    queryKey: ["user-activities", id],
    queryFn: async () => {
      try {
        const { data } = await getUserPosts(id);
        return data;
      } catch (e) {
        // return e;
        errorMessageHandler(e);
      }
    },
    keepPreviousData: true,
    enabled: !!id,
  });
}

export default useUserActivities;
