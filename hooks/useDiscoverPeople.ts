import { useQuery } from "@tanstack/react-query";
import { discoverPeopleList } from "../api/apiRequests";

function useDiscoverPeople() {
  return useQuery({
    queryKey: ["discover-people"],
    queryFn: async () => {
      try {
        const { data } = await discoverPeopleList();
        return data;
      } catch (e) {
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default useDiscoverPeople;
