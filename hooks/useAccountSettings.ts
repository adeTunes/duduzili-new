import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAccountSettings } from "../api/apiRequests";

function UseAccountSettings() {
  return useQuery({
    queryKey: ["account-settings"],
    queryFn: async () => {
      try {
        const { data } = await getAccountSettings();
        return data;
      } catch (e) {
        errorMessageHandler(e);
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default UseAccountSettings;
