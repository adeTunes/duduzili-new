import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../api/apiRequests";
import { SinglePost } from "../api/request.types";
import { useEffect, useState } from "react";
import { base64decode } from "nodejs-base64";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

const useSinglePost: (id: any) => { isLoading: boolean; data: SinglePost } = (
  id
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const postId = base64decode(id);
      getSinglePost(+postId / 1000000)
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

  return { isLoading, data };

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
