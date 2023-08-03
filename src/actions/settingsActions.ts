import { allowDiscoveryByEmail, connectAccount, togglePrivacy, toggleRecommendation, toggleSearch } from "../../api/apiRequests";
import { notify } from "../../utils/notification-handler";

export const addAccount = (loader, data, onSuccess) => {
    loader(true);
  connectAccount(data)
    .then(({ data }) => {
      notify({
        message: data?.message || data?.error,
      });
      onSuccess();
      loader(false);
    })
    .catch((e) => {
      notify({
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
      notify({
        message: data?.message || data?.error,
      });
      onSuccess();
      loader(false);
    })
    .catch((e) => {
      notify({
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
      notify({
        message: data?.message || data?.error,
      });
      onSuccess();
      loader(false);
    })
    .catch((e) => {
      notify({
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
      notify({
        message: data?.message || data?.error,
      });
      onSuccess();
      loader(false);
    })
    .catch((e) => {
      notify({
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
      notify({
        message: data?.message || data?.error,
      });
      onSuccess();
      loader(false);
    })
    .catch((e) => {
      notify({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
}