import { showNotification } from "@mantine/notifications";
import {
  blockUser,
  deletePost,
  editPost,
  followUser,
  joinOrLeaveCommunity,
  likeUnlikePost,
  muteUser,
  reportPost,
  reportUser,
  repostPost,
  savePost,
  unblockUser,
  unmuteUser,
} from "../../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

export const savePostAction = (loader, id, refetch) => {
  loader(true);
  savePost(id)
    .then(({ data }) => {
      showNotification({
        message: data?.message,
        color: "green",
      });
      refetch();
      loader(false);
    })
    .catch((e) => {
      if (e?.response?.status === 304) {
        loader(false)
        return showNotification({
          message: "Post already saved",
          color: "red"
        })
      } 
      showNotification({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
};
export const followUserAction = (loader, id, refetch) => {
  loader(true);
  followUser(id)
    .then(({ data }) => {
      showNotification({
        message: data?.message,
        color: "green",
      });
      refetch();
      loader(false);
    })
    .catch((e) => {
      showNotification({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
};
export const muteUserAction = (loader, id, refetch) => {
  loader(true);
  muteUser(id)
    .then(({ data }) => {
      showNotification({
        message: data?.message,
        color: "green",
      });
      refetch();
      loader(false);
    })
    .catch((e) => {
      showNotification({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
};
export const unmuteUserAction = (loader, id, refetch) => {
  loader(true);
  unmuteUser(id)
    .then(({ data }) => {
      showNotification({
        message: data?.message,
        color: "green",
      });
      refetch();
      loader(false);
    })
    .catch((e) => {
      showNotification({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
};
export const blockUserAction = (loader, id, refetch) => {
  loader(true);
  const formData = new FormData();
  formData.append("id", String(id));
  formData.append("reason", "Abusive word");
  blockUser(formData)
    .then(({ data }) => {
      showNotification({
        message: data?.message,
        color: "green",
      });
      refetch();
      loader(false);
    })
    .catch((e) => {
      showNotification({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
};
export const LeaveCommunityAction = (code, loader, refetch) => {
  loader(true);
  const formData = new FormData();
  formData.append("community_code", code);
  formData.append("action", "Reject");
  joinOrLeaveCommunity(formData)
    .then(({ data }) => {
      showNotification({
        message: data?.message,
        color: "green",
      });
      refetch();
      loader(false);
    })
    .catch((e) => {
      showNotification({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
};
export const unblockUserAction = (loader, id, refetch) => {
  loader(true);
  unblockUser(id)
    .then(({ data }) => {
      showNotification({
        message: data?.message,
        color: "green",
      });
      refetch();
      loader(false);
    })
    .catch((e) => {
      showNotification({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
};
export const reportPostAction = (data, loader, refetch) => {
  loader(true);
  reportPost(data)
    .then(({ data }) => {
      showNotification({
        message: data?.message,
        color: "green",
      });
      refetch();
      loader(false);
    })
    .catch((e) => {
      showNotification({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
};
export const repostPostAction = (data, loader, refetch) => {
  loader(true);
  repostPost(data)
    .then(({ data }) => {
      showNotification({
        message: data?.message,
        color: "green",
      });
      refetch();
      loader(false);
    })
    .catch((e) => {
      showNotification({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
};
export const reportUserAction = (data, loader, refetch) => {
  loader(true);
  reportUser(data)
    .then(({ data }) => {
      showNotification({
        message: data?.message,
        color: "green",
      });
      refetch();
      loader(false);
    })
    .catch((e) => {
      showNotification({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
};

export const likeOrUnlikePost = async (id, loader, onSuccess) => {
  loader(true);
  try {
    const request = await likeUnlikePost(id);
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
export const editParticularPost = async (id, data, loader, onSuccess) => {
  loader(true);
  try {
    const request = await editPost(id, data);
    showNotification({
      message: "Post edited successfully",
      color: "green",
    });
    onSuccess();
    loader(false);
  } catch (e) {
    loader(false);
    errorMessageHandler(e);
  }
};
export const deleteParticularPost = async (id, loader, onSuccess) => {
  loader(true);
  try {
    const {data} = await deletePost(id);
    showNotification({
      message: data?.message || "Post deleted successfully",
      color: "green",
    });
    onSuccess();
    loader(false);
  } catch (e) {
    loader(false);
    errorMessageHandler(e);
  }
};