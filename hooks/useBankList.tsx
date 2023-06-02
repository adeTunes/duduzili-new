import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useQuery } from "@tanstack/react-query";
import { getBankList } from "../api/apiRequests";

function UseBankList() {
  return useQuery({
    queryKey: ["bank-list"],
    queryFn: async () => {
      try {
        const { data } = await getBankList();
        return data.data?.reduce((acc, item) => {
            acc.push({label: item?.name, value: item?.code})
            return acc
        }, []);
      } catch (e) {
        errorMessageHandler(e);
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default UseBankList;
