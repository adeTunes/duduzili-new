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
  const [refetchData, setRefetchData] = useState(null)

  const refetch = (id) => {
    setRefetchData(id)
  }

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const postId = isHashed === false ? id : +(base64decode(id)) / 1000000;
      getSinglePost(postId)
        .then(({ data }) => {
          setData(data);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
          errorMessageHandler(e);
        });
    }
  }, [id]);


  useEffect(() => {
    if (refetchData) {
      setIsLoading(true);
      const postId = refetchData;
      getSinglePost(postId)
        .then(({ data }) => {
          setData(data);
          setIsLoading(false);
          setRefetchData(null)
        })
        .catch((e) => {
          setIsLoading(false);
          setRefetchData(null)
          errorMessageHandler(e);
        });
    }
  }, [refetchData]);
  

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
