import { useQuery } from "@tanstack/react-query";
import { searchEndpoint } from "../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useEffect, useState } from "react";

function useSearchResult(query) {
  return useQuery({
    queryKey: ["search-result", query],
    queryFn: async () => {
      try {
        const { data } = await searchEndpoint(query);
        return data;
      } catch (e) {
        errorMessageHandler(e);
        // return e;
      }
    },
    keepPreviousData: true,
    enabled: !!query,
  });
}

export default useSearchResult;
