import { useQuery } from "@tanstack/react-query";
import { blockedUsersList } from "../api/apiRequests";

function useBlockedUsers() {
  return useQuery({
    queryKey: ["blocked-users"],
    queryFn: async () => {
      try {
        const { data } = await blockedUsersList();
        return data;
      } catch (e) {
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default useBlockedUsers;
