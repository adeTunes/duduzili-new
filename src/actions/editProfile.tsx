import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { editProfile } from "../../api/apiRequests";
import { notify } from "../../utils/notification-handler";

export const editProfileRequest = async (id, data, loader, onSuccess) => {
  loader(true);
  try {
    const request = await editProfile(id, data);
    notify({
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
