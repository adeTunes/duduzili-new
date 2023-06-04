import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "../api/apiRequests";

function UseNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const { data } = await fetchNotifications();
        return data;
      } catch (e) {
        errorMessageHandler(e);
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default UseNotifications;
