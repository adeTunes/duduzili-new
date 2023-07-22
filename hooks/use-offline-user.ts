import { useQuery } from "@tanstack/react-query";
import { getOfflineUser, getUserPosts } from "../api/apiRequests";
import { Media } from "../api/request.types";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function useOfflineUser(id) {
  return useQuery({
    queryKey: ["offline-user", id],
    queryFn: async () => {
      try {
        const { data } = await getOfflineUser(id);
        return data;
      } catch (e) {
        // return e;
        // errorMessageHandler(e);
      }
    },
    keepPreviousData: true,
    enabled: !!id,
  });
}

export default useOfflineUser;
