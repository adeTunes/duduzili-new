import { Menu } from "@mantine/core";
import { ArrowDown2 } from "iconsax-react";
import React from "react";
import { deleteConversation } from "../../../api/apiRequests";
import { useQueryClient } from "@tanstack/react-query";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { currentChatFriend, selectedMessage } from "@/store";
import { useSetAtom } from "jotai";
import { notify } from "../../../utils/notification-handler";

function ChatsMenu({ chatID, setLoading }) {
  const setSelectedMessage = useSetAtom(selectedMessage);
  const setFriend = useSetAtom(currentChatFriend)
  const queryClient = useQueryClient();
  const deleteChat = () => {
    setLoading(true);
    const data = new FormData();
    data.append("conversation_id", chatID);
    deleteConversation(data)
      .then(({ data }) => {
        notify({ message: "Chat deleted" });
        queryClient.invalidateQueries(["conversations"]);
        setSelectedMessage("");
        setFriend("")
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  };
  return (
    <Menu>
      <Menu.Target>
        <ArrowDown2 className="group-hover:inline-block hidden" size={16} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => {
            deleteChat();
          }}
        >
          Clear conversation
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ChatsMenu;
