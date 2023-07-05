import { useQuery } from "@tanstack/react-query";
import { getCommunityDetail } from "../api/apiRequests";
import { CommunityDetails } from "../api/request.types";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useRouter } from "next/router";

function useCommunityDetails(code) {
  const {pathname} = useRouter()
  return useQuery<CommunityDetails>({
    queryKey: ["community-details", code],
    queryFn: async () => {
      try {
        const { data } = await getCommunityDetail(code);
        return data;
      } catch (e) {
        errorMessageHandler(e)
      }
    },
    keepPreviousData: true,
    enabled: code && pathname.includes("/communities")
  });
}

export default useCommunityDetails;
