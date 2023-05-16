import { showNotification } from "@mantine/notifications";
import {
  blockUser,
  followUser,
  muteUser,
  reportPost,
  savePost,
  unblockUser,
  unmuteUser,
} from "../../api/apiRequests";

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
