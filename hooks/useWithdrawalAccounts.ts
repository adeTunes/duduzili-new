import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useQuery } from "@tanstack/react-query";
import { getWithdrawalAccounts } from "../api/apiRequests";

function UseWithdrawalAccounts() {
  return useQuery({
    queryKey: ["withdrawal-accounts"],
    queryFn: async () => {
      try {
        const { data } = await getWithdrawalAccounts();
        return data;
      } catch (e) {
        errorMessageHandler(e);
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default UseWithdrawalAccounts;
