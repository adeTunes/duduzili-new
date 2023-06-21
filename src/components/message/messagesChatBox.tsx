import { Icon } from "@iconify/react";
import { TextInput, Textarea, clsx } from "@mantine/core";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useState, useEffect, useRef } from "react";
import MessageReceived from "./messageReceived";
import MessageSent from "./messageSent";
import {
  chatFriendOptions,
  selectedFriendToChat,
  selectedMessage,
  socketConnection,
  userDetails,
  wsReconnection,
} from "@/store";
import { useForm } from "@mantine/form";
import useWebsocketConnection from "../../../hooks/use-websocket-connection";
import AttachMedia from "./attach-media";
import { useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import EmojiContainer from "./emojiContainer";

function MessagesChatBox() {
  const [messageFriend, setSelectedMessage] = useAtom(selectedMessage);
  const setWsConnect = useSetAtom(socketConnection);
  const [friend, setFriend] = useState(null);
  const user: any = useAtomValue(userDetails);
  const [messages, setMessages] = useState([]);
  const [chatOptions, setChatOptions] = useAtom(chatFriendOptions);
  const [chatList, setChatList] = useAtom(selectedFriendToChat);
  const queryClient = useQueryClient();
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

  const { ws, setWs } = useWebsocketConnection(friend);
  const wsConnected = useAtomValue(socketConnection);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const setWsReconnect = useSetAtom(wsReconnection);

  const scrollToBottom = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  // useEffect(() => {
  //   scrollToBottom(); // Initial scroll to the bottom when the component mounts
  // }, [friend]);

  useEffect(() => {
    if (ws && wsConnected) {
      const receive = {
        command: "receive",
      };
      const intervalID = setInterval(() => {
        if (wsConnected) {
          try {
            ws.send(JSON.stringify(receive));
          } catch (error) {
            showNotification({ message: "Something went wrong" });
          }
        } else {
          setWsReconnect(true);
          clearInterval(intervalID);
        }
      }, 5000);

      return () => {
        clearInterval(intervalID);
      };
    }
  }, [ws, wsConnected]);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        // Process the incoming message
        const message = JSON.parse(event.data as string);
        if (message.msg_type === "ENTER") {
          setMessages(message.messages?.reverse());
        } else if (
          message?.msg_type === "MESSAGE" &&
          Array.isArray(message?.message)
        ) {
          if (message?.message?.length) {
            setMessages((prev) => {
              let findMessage = [];
              message?.message?.forEach((el) => {
                const found = prev?.find((item) => item.id === el.id);
                if (!found) {
                  findMessage.push(el);
                }
              });
              return [...prev, ...findMessage?.reverse()];
            });
          }
        } else if (!Array.isArray(message?.message)) {
          setMessages((prev) => [...prev, message.message?.reverse()]);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
        // Handle any necessary cleanup or reconnection logic
        setWsConnect(false);
        setWsReconnect(true);
      };
    }
  }, [ws]);

  const handleSendMessage = () => {
    const foundFriend = chatList?.find(
      (item) => item?.username === friend?.username
    );
    const chatMessage = {
      command: "send",
      text: form.values.text,
    };
    try {
      ws.send(JSON.stringify(chatMessage));
      if (foundFriend) {
        setChatOptions("chat initiated");
      }
      scrollToBottom();
      queryClient.invalidateQueries(["conversations"]);
    } catch (error) {
      showNotification({ message: "Something went wrong" });
    }
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiSelect = (emoji) => {
    form.setFieldValue("text", form.values.text + emoji.native);
  };

  return friend ? (
    <div
      id="no-scroll"
      className="grid grid-rows-[auto_1fr_auto] overflow-auto flex-1 flex-col gap-6"
    >
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
      <div
        ref={chatContainerRef}
        id="messages no-scroll"
        className="flex messages-no-scroll overflow-auto flex-1 flex-col gap-5"
      >
        {messages?.map((item) =>
          item?.sender?.id === user?.user?.id ? (
            <MessageSent
              text={item?.text}
              time={item?.date_added}
              key={item?.id}
            />
          ) : (
            <MessageReceived
              text={item?.text}
              time={item?.date_added}
              key={item?.id}
            />
          )
        )}
        {/* <MessageReceived time={new Date()} text="hello people" />
        <MessageSent
          time={new Date()}
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dicta, veritatis dolore, perspiciatis aliquam quos dolorum hic eveniet dolores odio libero laborum ab quod illum! Facilis voluptas deleniti enim alias dolor nihil quos, dolorem doloribus. Nesciunt nam recusandae eligendi quaerat, molestias accusamus ipsam culpa cupiditate itaque minima labore amet id?"
        />
        <MessageReceived time={new Date()} text="hello people" />
        <MessageSent
          time={new Date()}
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dicta, veritatis dolore, perspiciatis aliquam quos dolorum hic eveniet dolores odio libero laborum ab quod illum! Facilis voluptas deleniti enim alias dolor nihil quos, dolorem doloribus. Nesciunt nam recusandae eligendi quaerat, molestias accusamus ipsam culpa cupiditate itaque minima labore amet id?"
        />
        <MessageReceived
          time={new Date()}
          text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus fugit illum omnis quia eum nulla ad ea recusandae sapiente tempora."
        />

        <SingleEmojiSent /> */}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.reset();
          handleSendMessage();
        }}
        className="flex items-center justify-between gap-4"
      >
        <div className="flex pl-6 items-center gap-4 flex-1 bg-[#EDF0FB] rounded-[40px]">
          <div className="flex items-center max-[590px]:hidden gap-3">
            <EmojiContainer form={form} />
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
          <div className="max-[590px]:flex items-center hidden gap-2">
            <EmojiContainer form={form} />
            <AttachMedia />
          </div>
          <Textarea
            id="no-scroll"
            classNames={{
              input:
                "h-[64px] placeholder:text-[12px] !pt-[20px] bg-transparent border-0",
              root: "flex-1",
            }}
            placeholder="Enter your message"
            {...form.getInputProps("text")}
          />
        </div>
        <button type="submit">
          <Icon
            className="cursor-pointer"
            icon="carbon:send"
            color="#4534B8"
            height={32}
            width={32}
          />
        </button>
      </form>
    </div>
  ) : (
    <></>
  );
}

export default MessagesChatBox;
