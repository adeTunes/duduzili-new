import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { showNotification } from "@mantine/notifications";
import { likeUnlikeComment, postAComment } from "../../api/apiRequests";

export const postComment = async (data, loader, onSuccess) => {
  loader(true);
  try {
    const request = await postAComment(data);
    showNotification({
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
    showNotification({
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


