import { useQuery } from "@tanstack/react-query";
import { getUserFollowings } from "../api/apiRequests";
import { FollowingsType } from "../api/request.types";

function useFollowings(id: number) {
  return useQuery({
    queryKey: ["user-followings", id],
    queryFn: async () => {
      try {
        const { data } = await getUserFollowings(id);
        return data;
      } catch (e) {
        // return e;
      }
    },
    keepPreviousData: true,
    enabled: !!id,
  });
}

export default useFollowings;
