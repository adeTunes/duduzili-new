import { showNotification } from "@mantine/notifications";
import { switchStatusOffline, switchStatusOnline } from "../../api/apiRequests";

export const goOnline = (loader, successAction) => {
  loader(true);
  switchStatusOnline()
    .then(({ data }) => {
      showNotification({
        message: data?.message,
        color: "green",
      });
      successAction();
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
export const goOffline = (loader, successAction) => {
  loader(true);
  switchStatusOffline()
    .then(({ data }) => {
      showNotification({
        message: data?.message,
        color: "green",
      });
      successAction();
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
