import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getFeedSettings, getNotificationSettings, getSafetySettings } from "../api/apiRequests";

function UseNotificationSettings() {
  return useQuery({
    queryKey: ["notification-settings"],
    queryFn: async () => {
      try {
        const { data } = await getNotificationSettings();
        return data;
      } catch (e) {
        errorMessageHandler(e);
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default UseNotificationSettings;
