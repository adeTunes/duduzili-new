import { useQuery } from "@tanstack/react-query";
import { fetchConversations } from "../api/apiRequests";
import { Posts } from "../api/request.types";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function useConversations() {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      try {
        const { data } = await fetchConversations();
        return data.data;
      } catch (e) {
        errorMessageHandler(e)
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default useConversations;
