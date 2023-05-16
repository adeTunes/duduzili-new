import { useQuery } from "@tanstack/react-query";
import { mutedUsersList } from "../api/apiRequests";

function useMutedUsers() {
  return useQuery({
    queryKey: ["muted-users"],
    queryFn: async () => {
      try {
        const { data } = await mutedUsersList();
        return data;
      } catch (e) {
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default useMutedUsers;
