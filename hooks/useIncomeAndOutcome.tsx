import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchWalletIncomeAndOutcome } from "../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function useIncomeAndOutcome() {
  return useQuery({
    queryKey: ["income-outcome"],
    queryFn: async () => {
      try {
        const { data } = await fetchWalletIncomeAndOutcome();
        return data;
      } catch (e) {
        errorMessageHandler(e);
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default useIncomeAndOutcome;
