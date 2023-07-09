import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../api/apiRequests";
import { SinglePost } from "../api/request.types";
import { useEffect, useState } from "react";
import { base64decode } from "nodejs-base64";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

const useSinglePost: (id: any, isHashed?: boolean) => { isLoading: boolean; data: SinglePost, refetch: (id: any) => void } = (
  id,
  isHashed
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [refetchState, setRefetchState] = useState(true)

  useEffect(() => {
    if (id && refetchState) {
      setIsLoading(true);
      const postId = isHashed === false ? id : +(base64decode(id)) / 1000000;
      getSinglePost(postId)
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

export default useSinglePost;
