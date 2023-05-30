import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getFeedSettings, getSafetySettings } from "../api/apiRequests";

function UseFeedSettings() {
  return useQuery({
    queryKey: ["feed-settings"],
    queryFn: async () => {
      try {
        const { data } = await getFeedSettings();
        return data;
      } catch (e) {
        errorMessageHandler(e);
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default UseFeedSettings;
