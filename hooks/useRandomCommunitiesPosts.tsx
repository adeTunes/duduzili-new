import { useQuery } from "@tanstack/react-query";
import React from "react";
import { randomCommunitiesPosts } from "../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { RandomPostType } from "../api/request.types";

function useRandomCommunitiesPosts() {
  return useQuery<RandomPostType[]>({
    queryKey: ["random-communities-posts"],
    queryFn: async () => {
      try {
        const { data } = await randomCommunitiesPosts();
        return data.data;
      } catch (e) {
        errorMessageHandler(e);
        // return e;
      }
    },
    keepPreviousData: true,
  });
}

export default useRandomCommunitiesPosts;
