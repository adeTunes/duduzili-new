import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAccountSettings, getSafetySettings } from "../api/apiRequests";

function UseSafetySettings() {
  return useQuery({
    queryKey: ["safety-settings"],
    queryFn: async () => {
      try {
        const { data } = await getSafetySettings();
        return data;
      } catch (e) {
        errorMessageHandler(e);
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default UseSafetySettings;
