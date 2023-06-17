import { userDetails } from "@/store";
import { Icon } from "@iconify/react";
import { useAtomValue } from "jotai";
import { useDisclosure } from "@mantine/hooks";
import CommentPostModal from "@/components/modals/commentPostModal";
import { AudioSquare } from "iconsax-react";

function ReplyInput() {
  const user: any = useAtomValue(userDetails);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="grid gap-4 grid-cols-[auto_1fr]">
      <img
        src={user?.user?.photo_url?.substring(62) || "/profile-pic-default.png"}
        className="w-[56px] h-[56px] rounded-full object-cover"
        alt=""
      />
      <div
        onClick={open}
        className="cursor-pointer bg-white pl-6 pr-5 py-2 rounded-[32px] grid grid-cols-[1fr_auto] items-center"
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
      >
        <p>Reply this thread</p>
        <div className="flex max-[415px]:hidden items-center gap-3">
          <Icon icon="ic:outline-image" height={24} width={24} />
          <Icon icon="ic:outline-videocam" height={24} width={24} />
          <AudioSquare size="24" color="#2A2A2A" variant="Outline" />
        </div>
      </div>
      <CommentPostModal opened={opened} close={close} />
    </div>
  );
}

export default ReplyInput;
