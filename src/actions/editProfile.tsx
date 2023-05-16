import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { editProfile } from "../../api/apiRequests";
import { showNotification } from "@mantine/notifications";

export const editProfileRequest = async (id, data, loader, onSuccess) => {
  loader(true);
  try {
    const request = await editProfile(id, data);
    showNotification({
      title: "Success",
      message: "Profile edited successfully",
      color: "green",
    });
    onSuccess();
    loader(false);
  } catch (e) {
    loader(false);
    errorMessageHandler(e);
  }
};
