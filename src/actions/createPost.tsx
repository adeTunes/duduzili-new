import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { communityPost, createPostRequest } from "../../api/apiRequests";
import { notify } from "../../utils/notification-handler";

export const createPost = async (data, publish, loader, onSuccess) => {
  loader(true);
  try {
    const request = await createPostRequest(data);
    notify({
      message: publish === "True" ? "Post Created successfully" : publish === "publish" ? "Draft published successfully" : "Post saved to drafts",
      color: "green",
    });
    onSuccess();
    loader(false);
  } catch (e) {
    loader(false);
    errorMessageHandler(e);
  }
};

export const createCommunityPost = async (data, loader, onSuccess) => {
  loader(true);
  try {
    const request = await communityPost(data);
    notify({
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