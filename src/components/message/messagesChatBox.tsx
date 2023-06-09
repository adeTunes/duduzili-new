import { Icon } from "@iconify/react";
import { TextInput, Textarea, clsx } from "@mantine/core";
import { useAtom, useAtomValue } from "jotai";
import React, { useState, useEffect } from "react";
import MessageReceived from "./messageReceived";
import MessageSent from "./messageSent";
import SendMessage from "./sendMessage";
import SingleEmojiSent from "./singleEmojiSent";
import Image from "next/image";
import { selectedMessage, userDetails } from "@/store";
import WebSocket from "isomorphic-ws";
import { useForm } from "@mantine/form";
import useWebsocketConnection from "../../../hooks/use-websocket-connection";

function MessagesChatBox() {
  const messageFriend = useAtomValue(selectedMessage);
  const [friend, setFriend] = useState(null);
  const user: any = useAtomValue(userDetails);
  const [messages, setMessages] = useState([]);
  const form = useForm({
    initialValues: {
      text: "",
    },
  });

  useEffect(() => {
    if (messageFriend) {
      setFriend(JSON.parse(messageFriend));
    }
  }, [messageFriend]);

  const { ws } = useWebsocketConnection(friend);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        console.log("Received message:", event.data);
        // Process the incoming message
        const message = JSON.parse(event.data);
        if(message.msg_type === "ENTER") {
          setMessages(message.messages);
        }
        else if(message?.message) {
          setMessages((prev) => [...prev, message.message]);
        }

      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
        // Handle any necessary cleanup or reconnection logic
      };
    }
  }, [ws]);

  const handleSendMessage = () => {
    const chatMessage = {
      command: "send",
      text: form.values.text,
      username: friend?.username,
    };

    ws.send(JSON.stringify(chatMessage));
  };

  return (
    <div className="flex overflow-auto flex-1 flex-col gap-6">
      <div className="flex pb-4 border-b border-b-[#EDF0FB] items-center justify-between">
        <div className="flex items-center gap-[19px]">
          <div className="h-[52px] w-[52px]">
            <img
              src={
                friend?.photo_url?.substring(62) || "/profile-pic-default.png"
              }
              className="h-full w-full object-cover rounded-full"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-[2px]">
            <p className="text-[18px] font-semibold text-[#222222] leading-[22px]">
              {friend?.first_name} {friend?.last_name}
            </p>
            <p className="text-[14px] leading-[17px] text-[#2A2A2A]">
              @{friend?.username}
            </p>
          </div>
        </div>
        <Icon
          height={24}
          className="cursor-pointer"
          width={24}
          icon="carbon:overflow-menu-vertical"
        />
      </div>
      <div id="messages" className="flex flex-1 overflow-auto flex-col gap-5">
        {messages?.map((item, idx) =>
          item?.sender?.id === user?.user?.id ? (
            <MessageSent text={item?.text} time={item?.date_added} key={item?.id} />
          ) : (
            <MessageReceived text={item?.text} time={item?.date_added} key={item?.id} />
          )
        )}
        {/* <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <SingleEmojiSent /> */}
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex pl-6 items-center gap-4 flex-1 bg-[#EDF0FB] rounded-[40px]">
          <div className="flex items-center gap-3">
            <Icon
              icon="ph:smiley-bold"
              color="#4534b8"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <Icon
              icon="ic:outline-image"
              color="#4534b8"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <Icon
              icon="mdi:video-outline"
              color="#4534b8"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <Icon
              icon="ant-design:audio-outlined"
              color="#4534b8"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
          <Textarea
            classNames={{
              input: "h-[64px] !pt-[20px] bg-transparent border-0",
              root: "flex-1",
            }}
            placeholder="Enter your message"
            {...form.getInputProps("text")}
          />
        </div>
        <Icon
          onClick={() => {
            form.reset()
            handleSendMessage();
          }}
          className="cursor-pointer"
          icon="carbon:send"
          color="#4534B8"
          height={32}
          width={32}
        />
      </div>
    </div>
  );
}

export default MessagesChatBox;
