import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { likeUnlikeComment, postAComment } from "../../api/apiRequests";
import { notify } from "../../utils/notification-handler";

export const postComment = async (data, loader, onSuccess) => {
  loader(true);
  try {
    const request = await postAComment(data);
    notify({
      message: "Comment sent",
      color: "green",
    });
    onSuccess();
    loader(false);
  } catch (e) {
    loader(false);
    errorMessageHandler(e);
  }
}
export const likeOrUnlikeComment = async (id, loader, onSuccess) => {
  loader(true);
  try {
    const request = await likeUnlikeComment(id);
    notify({
      message: request.data.message,
      color: "green",
    });
    onSuccess();
    loader(false);
  } catch (e) {
    loader(false);
    errorMessageHandler(e);
  }
};


