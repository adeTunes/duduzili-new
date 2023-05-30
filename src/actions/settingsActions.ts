import { showNotification } from "@mantine/notifications";
import { allowDiscoveryByEmail, connectAccount, togglePrivacy, toggleRecommendation, toggleSearch } from "../../api/apiRequests";

export const addAccount = (loader, data, onSuccess) => {
    loader(true);
  connectAccount(data)
    .then(({ data }) => {
      showNotification({
        message: data?.message || data?.error,
      });
      onSuccess();
      loader(false);
    })
    .catch((e) => {
      showNotification({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
}
export const togglePrivacyAction = (loader, onSuccess) => {
    loader(true);
  togglePrivacy()
    .then(({ data }) => {
      showNotification({
        message: data?.message || data?.error,
      });
      onSuccess();
      loader(false);
    })
    .catch((e) => {
      showNotification({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
}
export const toggleSearchAction = (loader, onSuccess) => {
    loader(true);
  toggleSearch()
    .then(({ data }) => {
      showNotification({
        message: data?.message || data?.error,
      });
      onSuccess();
      loader(false);
    })
    .catch((e) => {
      showNotification({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
}
export const toggleRecommendationAction = (loader, onSuccess) => {
    loader(true);
  toggleRecommendation()
    .then(({ data }) => {
      showNotification({
        message: data?.message || data?.error,
      });
      onSuccess();
      loader(false);
    })
    .catch((e) => {
      showNotification({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
}
export const allowDiscoveryByEmailAction = (loader, onSuccess) => {
    loader(true);
  allowDiscoveryByEmail()
    .then(({ data }) => {
      showNotification({
        message: data?.message || data?.error,
      });
      onSuccess();
      loader(false);
    })
    .catch((e) => {
      showNotification({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
}