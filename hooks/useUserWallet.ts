import { useQuery } from "@tanstack/react-query";
import { getTransactionHistory, getUserWallet } from "../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function useUserWallet() {
  return useQuery({
    queryKey: ["user-wallet"],
    queryFn: async () => {
      try {
        const { data } = await getUserWallet();
        return data;
      } catch (e) {
        errorMessageHandler(e)
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default useUserWallet;
