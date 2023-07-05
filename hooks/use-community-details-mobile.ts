import { getCommunityDetail } from "../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function useCommunityDetailsMobile(code) {
  const { pathname } = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [refetchState, setRefetchState] = useState(true)
  const fetchData = async () => {
    setIsloading(true);
    try {
      const { data } = await getCommunityDetail(code);
      setData(data);
      setIsloading(false);
    } catch (e) {
      errorMessageHandler(e);
      setIsloading(false);
    }
    setRefetchState(false)
  };

  useEffect(() => {
    if (code && pathname.includes("/communities") && refetchState) fetchData();
  }, [pathname, code, refetchState]);

  const refetch = () => {
    setRefetchState(true)
  }

  return { data, isLoading, refetch };
}

export default useCommunityDetailsMobile;
