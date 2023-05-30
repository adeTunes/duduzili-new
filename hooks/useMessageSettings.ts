import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAccountSettings, getMessageSettings, getSafetySettings } from "../api/apiRequests";

function UseMessageSettings() {
  return useQuery({
    queryKey: ["message-settings"],
    queryFn: async () => {
      try {
        const { data } = await getMessageSettings();
        return data;
      } catch (e) {
        errorMessageHandler(e);
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default UseMessageSettings;
