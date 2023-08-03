import { switchStatusOffline, switchStatusOnline } from "../../api/apiRequests";
import { notify } from "../../utils/notification-handler";

export const goOnline = (loader, successAction) => {
  loader(true);
  switchStatusOnline()
    .then(({ data }) => {
      notify({
        message: data?.message,
        color: "green",
      });
      successAction();
      loader(false);
    })
    .catch((e) => {
      notify({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
};
export const goOffline = (loader, successAction) => {
  loader(true);
  switchStatusOffline()
    .then(({ data }) => {
      notify({
        message: data?.message,
        color: "green",
      });
      successAction();
      loader(false);
    })
    .catch((e) => {
      notify({
        message: "Something went wrong",
        color: "red",
      });
      loader(false);
    });
};
