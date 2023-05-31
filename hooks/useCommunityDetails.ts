import { useQuery } from "@tanstack/react-query";
import { getCommunityDetail } from "../api/apiRequests";
import { CommunityDetails } from "../api/request.types";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function useCommunityDetails(code) {
  return useQuery<CommunityDetails>({
    queryKey: ["community-details", code],
    queryFn: async () => {
      try {
        const { data } = await getCommunityDetail(code);
        return data;
      } catch (e) {
        errorMessageHandler(e)
        // return e;
      }
    },
    keepPreviousData: true,
    enabled: !!code
  });
}

export default useCommunityDetails;
