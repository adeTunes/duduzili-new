import { useQuery } from "@tanstack/react-query";
import { getTransactionHistory } from "../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function useTransactionHistory() {
  return useQuery({
    queryKey: ["transaction-history"],
    queryFn: async () => {
      try {
        const { data } = await getTransactionHistory();
        return data;
      } catch (e) {
        errorMessageHandler(e)
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default useTransactionHistory;
