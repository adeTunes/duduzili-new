import { getSingleComment } from "../api/apiRequests";
import { useEffect, useState } from "react";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

const useSingleComment: (id: any) => { isLoading: boolean; data: any, refetch: (id: any) => void } = (
  id,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [refetchState, setRefetchState] = useState(true)

  useEffect(() => {
    if (id && refetchState) {
      setIsLoading(true);
      getSingleComment(id)
        .then(({ data }) => {
          setData(data);
          setIsLoading(false);
          setRefetchState(false)
        })
        .catch((e) => {
          setIsLoading(false);
          errorMessageHandler(e);
        });
    }
  }, [id, refetchState]);

  const refetch = () => {
    setRefetchState(true)
  }

  

  return { isLoading, data, refetch };

  // return useQuery<SinglePost>({
  //   queryKey: ["single-posts", id],
  //   queryFn: async () => {
  //     try {
  //       const { data } = await getSinglePost(id);
  //       return data;
  //     } catch (e) {
  //       // return e;
  //     }
  //   },
  //   keepPreviousData: true,
  //   enabled: !!id,
  // });
};

export default useSingleComment;
