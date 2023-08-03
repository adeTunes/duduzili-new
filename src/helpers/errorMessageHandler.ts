import { notify } from "../../utils/notification-handler";

type ErrorType = {
  response?: { data?: { data?: {}; error?: {} | string[], message: any }; status: number };
  message: string;
};
export const errorMessageHandler = (obj: ErrorType) => {
  try {
    if (obj.response) {
      if (obj.response.status === 401) {
        localStorage.removeItem("duduzili-user")
        return (location.href = "/login");
      }
      if (obj.response.status === 500) {
        return notify({
          title: "Server Error",
          message: "Please contact the site administrator",
          color: "red",
        });
      }
      if (obj.response.status === 404) {
        return notify({
          title: "Page not found",
          message: "Please contact the site administrator",
          color: "red",
        });
      }
      if(obj?.response?.data?.message && typeof obj?.response?.data?.message === "string"){
        return notify({
          message: obj?.response?.data?.message,
          color: "red",
        });
      }
      if (obj.response.data.data) {
        if(typeof obj.response.data.data === "string")
        return notify({
          title: "Error",
          message: obj.response.data.data,
          color: "red",
        })
        Object.entries(obj.response.data.data).map((item: any[], idx) => {
          if (item[1].length > 1) {
            item[1].forEach((el) =>
              notify({
                title: item[0].replace("_", " "),
                message: el,
                color: "red",
              })
            );
          } else {
            notify({
              title: item[0].replaceAll("_", " "),
              message: item[1],
              color: "red",
            });
          }
        });
      } else if (obj.response.data.error) {
        if (typeof obj.response.data.error === "string") {
          return notify({
            title: "Alert",
            message: obj.response.data.error,
            color: "red",
          });
        }
        if (Array.isArray(obj.response.data.error))
          return notify({
            title: "Error",
            message: String(obj.response.data.error),
            color: "red",
          });
        Object.entries(obj.response.data.error).map((item: any[], idx) => {
          if (item[1].length > 1) {
            item[1].forEach((el) => {
              if (typeof el === "string") {
                notify({
                  title: item[0].replaceAll("_", " "),
                  message: el,
                  color: "red",
                });
              } else if (typeof el === "object") {
                Object.entries(el).map((item: any[], idx) => {
                  notify({
                    title: item[0].replaceAll("_", " "),
                    message: item[1],
                    color: "red",
                  });
                });
              }
            });
          } else {
            notify({
              title: item[0].replaceAll("_", " "),
              message: item[1],
              color: "red",
            });
          }
        });
      }
    } else
      notify({
        title: "Error",
        message: obj.message,
        color: "red",
      });
    
  } catch (error) {
    notify({
      title: "Error",
      message: "Something went wrong",
      color: "red",
    });
  }
};
