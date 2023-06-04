import { useQuery } from "@tanstack/react-query";
import { getUserFollowers, getUserFollowings } from "../api/apiRequests";
import { FollowingsType } from "../api/request.types";

function useFollowers(id: number) {
  return useQuery<FollowingsType>({
    queryKey: ["user-followers", id],
    queryFn: async () => {
      try {
        const { data } = await getUserFollowers(id);
        return data;
      } catch (e) {
        // return e;
      }
    },
    keepPreviousData: true,
    enabled: !!id,
  });
}

export default useFollowers;
