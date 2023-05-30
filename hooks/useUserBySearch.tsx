import { useQuery } from "@tanstack/react-query";
import { getUserBySearch } from "../api/apiRequests";
import { Post } from "../api/request.types";

function UseUserBySearch(search) {
  return useQuery({
    queryKey: ["search-user", search],
    queryFn: async () => {
      try {
        const { data } = await getUserBySearch(search);
        return data.data;
      } catch (e) {
        // return e;
      }
    },
    keepPreviousData: true,
    enabled: !!search
  });
}

export default UseUserBySearch;
