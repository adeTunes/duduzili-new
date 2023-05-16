import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { createPostRequest } from "../../api/apiRequests";
import { showNotification } from "@mantine/notifications";

export const createPost = async (data, loader, onSuccess) => {
  loader(true);
  try {
    const request = await createPostRequest(data);
    showNotification({
      title: "Success",
      message: "Post created successfully",
      color: "green",
    });
    onSuccess();
    loader(false);
  } catch (e) {
    loader(false);
    errorMessageHandler(e);
  }
};
