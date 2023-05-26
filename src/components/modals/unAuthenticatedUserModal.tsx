import { Modal, Button } from "@mantine/core";
import { useRouter } from "next/router";

export const UnAuthenticaticatedUserModal = ({ opened, setOpened }) => {
  const { push } = useRouter();
  return (
    <Modal
      size="45.483vw"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content:
          "py-6 px-8 rounded-[24px] min-w-[280px] max-w-[500px] flex flex-col overflow-auto",
        header: "!px-0 !pt-0 !pb-6 border-b border-b-[#EDF0FB]",
        title: "font-semibold text-[20px] text-black leading-6",
        body: "overflow-auto grid !gap-[40px] !p-0 !pt-6",
      }}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
      }}
      opened={opened}
      onClose={() => setOpened(false)}
      title="Welcome to Duduzili!"
      centered
    >
      <p className="mb-[40px]">
        Login or signup on Duduzili to connect and interact with other users
      </p>
      <div className="grid grid-cols-2 gap-3">
        <button
          className="bg-[#4534B8] hover:bg-[#4534B8] rounded-[32px] h-[51px] text-white"
          onClick={() => push("/login")}
        >
          Log in
        </button>
        <button
          onClick={() => push("/sign-up")}
          className="bg-[#EDF0FB] hover:bg-[#EDF0FB] rounded-[32px] h-[51px] text-[#4534B8] leading-[19px] font-medium"
        >
          Sign up
        </button>
      </div>
    </Modal>
  );
};
// onConfirm: () => location.pathname = "/login"
