import { toast } from "react-toastify";

export const notify = ({
  message,
  color,
  title,
}: {
  message: string;
  color?: string;
  title?: string;
}) => {
  if (color === "red") {
    return toast.error(message, {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  return toast.success(message, {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
