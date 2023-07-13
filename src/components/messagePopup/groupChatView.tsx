import { Icon } from "@iconify/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import GroupMessageReceived from "../message/groupMessageReceived";
import MessageSent from "../message/messageSent";
import GroupAudioReceived from "../message/groupAudioReceived";
import GroupSingleEmojiReceived from "../message/groupSingleEmojiReceived";
import AudioSent from "../message/audioSent";
import SendMessage from "../message/sendMessage";
import { FileInput, Skeleton, Textarea } from "@mantine/core";
import { useAtom, useAtomValue } from "jotai";
import {
  chatFriendOptions,
  popupChatFriendOptions,
  popupFriend,
  popupSelectedFriendToChat,
  selectedFriendToChat,
  selectedMessage,
  userDetails,
} from "@/store";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import DefaultProfilePicture from "../profile/defaultProfilePicture";
import PhotoReceived from "../message/photoReceived";
import MessageReceived from "../message/messageReceived";
import VideoReceived from "../message/videoReceived";
import PhotoSent from "../message/photoSent";
import VideoSent from "../message/videoSent";

function GroupChatView({ setAction, setTab }) {
  const [messageFriend, setSelectedMessage] = useAtom(popupFriend);
  const [friend, setFriend] = useState(null);
  const user: any = useAtomValue(userDetails);
  const [messages, setMessages] = useState(null);
  const [chatList, setChatList] = useAtom(popupSelectedFriendToChat);
  const [file, setFile] = useState(null);
  const [source, setSource] = useState<string | ArrayBuffer>("");
  const [opened, { open, close }] = useDisclosure(false);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [attachMediaOpened, setAttachMediaOpened] = useState(false);
  const queryClient = useQueryClient();
  const { query, push } = useRouter();
  const [loading, setLoading] = useState(true);
  const [reconnectionCount, setReconnectionCount] = useState(0);
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
  const ws = useMemo(() => {
    if (friend) {
      return new WebSocket(
        `${process.env.NEXT_PUBLIC_SOCKET_URL}/ws/chat/${friend?.username}?token=${user?.token}`
      );
    }
    return null; // Return null if either friend or userToken is not available
  }, [friend, reconnectionCount]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  // useEffect(() => {
  //   scrollToBottom(); // Initial scroll to the bottom when the component mounts
  // }, [friend]);
  const reduceMessage = (array) => {
    return array.reverse().reduce((result, message) => {
      const currentDate = new Date();
      const messageDate = new Date(message.date_added);

      const today = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );

      const yesterday = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 1
      );

      let dateKey;
      if (messageDate >= today) {
        dateKey = "Today";
      } else if (messageDate >= yesterday) {
        dateKey = "Yesterday";
      } else {
        dateKey = messageDate.toLocaleDateString();
      }

      if (!result[dateKey]) {
        result[dateKey] = [];
      }
      result[dateKey].push(message);
      return result;
    }, {});
  };

  useEffect(() => {
    if (ws) {
      let intervalID;
      let timeoutID;
      ws.onopen = () => {
        // Perform any necessary join or initial setup actions
        const joinRoom = {
          command: "join",
          username: user?.user?.username,
        };
        try {
          ws.send(JSON.stringify(joinRoom));
        } catch (error) {
          showNotification({ message: "Something went wrong" });
        }
        const receive = {
          command: "receive",
        };
        intervalID = setInterval(() => {
          try {
            ws.send(JSON.stringify(receive));
          } catch (error) {}
        }, 5000);
      };

      ws.onmessage = (event) => {
        // Process the incoming message
        // parse the json data received from the socket
        const message = JSON.parse(event.data as string);
        //check what typw of message is gotten, if the message type is "ENTEr", it means it's received at the point of securing a connection
        if (message.msg_type === "ENTER") {
          // if the message type is enter, the data sent from backend is an array of objects that I have to reverse so the last message can be at the bottom

          setMessages(reduceMessage(message.messages));
        } else if (
          // When you send a message or you receive a message from backend, the message type is "Message"
          message?.msg_type === "MESSAGE" &&
          Array.isArray(message?.message)
        ) {
          if (message?.message?.length) {
            setMessages((prev) => {
              const date = new Date(
                message.message[0].date_added
              ).toLocaleDateString();
              return {
                ...prev,
                [date]: prev[date]
                  ? [...prev[date], message.message]
                  : [message.message],
              };
              //   let findMessage = [];
              //   message?.message?.forEach((el) => {
              //     const found = prev?.find((item) => item.id === el.id);
              //     if (!found) {
              //       findMessage.push(el);
              //     }
              //   });
              //   return [...prev, ...findMessage?.reverse()];
            });
          }
        } else if (!Array.isArray(message?.message)) {
          const date = new Date(
            message.message.date_added
          ).toLocaleDateString();
          setMessages((prev) => {
            return {
              ...prev,
              [date]: prev[date]
                ? [...prev[date], message.message]
                : [message.message],
            };
          });
        }
      };

      ws.onclose = () => {
        console.warn("WebSocket connection closed");
        // Handle any necessary cleanup or reconnection logic
        timeoutID = setTimeout(() => {
          setReconnectionCount((prevCount) => prevCount + 1);
        }, 3000);
      };

      return () => {
        ws.close();
        clearInterval(intervalID);
        clearTimeout(timeoutID);
      };
    }
  }, [ws]);

  const handleSendMessage = (prop?: {
    media?: string;
    type: "photo" | "audio" | "video";
  }) => {
    form.reset();
    let chatMessage;
    if (prop) {
      const { media, type } = prop;
      chatMessage = {
        command: "send",
        [type]: media,
        text: type,
      };
    } else {
      chatMessage = {
        command: "send",
        text: form.values.text,
      };
    }
    try {
      ws.send(JSON.stringify(chatMessage));
      scrollToBottom();
      queryClient.invalidateQueries(["conversations"]);
    } catch (error) {
      showNotification({ message: "Something went wrong" });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent the default Enter behavior (line break)
      if (!form.values.text.trim()) {
        form.reset();
        return;
      }
      handleSendMessage(); // Call the onSubmit event handler manually
    }
  };

  useEffect(() => {
    if (file) {
      if (file.type.includes("image")) {
        var reader = new FileReader();

        reader.onload = function (e) {
          setSource(e.target.result);
          open();
        };

        reader.readAsDataURL(file);
      } else if (file && file.type.includes("video")) {
        setSource(URL.createObjectURL(file));
        open();
      }
    }
  }, [file?.name]);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      var dayContainers = document.querySelectorAll(".day-container");

      for (var i = 0; i < dayContainers.length; i++) {
        var dayContainer = dayContainers[i];
        var dateElement = dayContainer.querySelector(".date");

        var rect = dayContainer.getBoundingClientRect();
        var isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (isInView) {
          dateElement.classList.add("sticky");
        } else {
          dateElement.classList.remove("sticky");
        }
      }
    });
  }, []);
  return friend ? (
    <div className="flex mx-4 max-[345px]:mx-1 overflow-auto h-full flex-col gap-3">
      <div className="flex pb-4 border-b border-b-[#C0D0E8] items-center gap-2">
        <Icon
          onClick={() => {
            setTab(0);
            setAction("friend-list");
          }}
          className="cursor-pointer"
          icon="mdi:arrow-left"
          height={25}
          width={25}
        />
        <div className="flex  items-center gap-[19px]">
          <div className="flex">
            {friend?.photo_url ? (
              <img
                src={friend?.photo_url}
                className="w-6 h-6 rounded-full object-cover"
                alt=""
              />
            ) : (
              <DefaultProfilePicture
                firstName={friend?.first_name}
                lastName={friend?.last_name}
                text="text-[80%]"
              />
            )}
          </div>
          <div className="flex flex-col gap-[2px]">
            <p className="text-[#222222] font-semibold leading-6">
              {friend?.first_name} {friend?.last_name}
            </p>
            <p className="text-[#2a2a2a] text-xs leading-[15px]">
              @{friend?.username}
            </p>
          </div>
        </div>
      </div>
      <div className="overflow-auto flex flex-col flex-1">
        <div
          id="messages"
          ref={chatContainerRef}
          className="flex flex-1 overflow-auto flex-col gap-5"
        >
          {!messages ? (
            <Skeleton className="rounded-l-2xl rounded-tr-2xl" />
          ) : (
            Object.entries(messages)?.map(([date, chats]: any, idx) => (
              <div key={date} className="day-container">
                <div className="flex-col day gap-3 flex">
                  <span className="date">
                    <span className=" bg-[#EDF0FB] p-2 rounded-2xl">
                      {date}
                    </span>
                  </span>
                  <div className="flex-col gap-5 flex">
                    {chats?.map((item) =>
                      item?.sender?.id === user?.user?.id ? (
                        item?.media?.video ? (
                          <VideoSent
                            key={item?.id}
                            video={item?.media?.video}
                            time={item?.date_added}
                          />
                        ) : item?.media?.photo ? (
                          <PhotoSent
                            key={item?.id}
                            photo={item?.media?.photo}
                            time={item?.date_added}
                          />
                        ) : (
                          <MessageSent
                            text={item?.text}
                            time={item?.date_added}
                            key={item?.id}
                          />
                        )
                      ) : item?.media?.video ? (
                        <VideoReceived
                          key={item?.id}
                          video={item?.media?.video}
                          time={item?.date_added}
                        />
                      ) : item?.media?.photo ? (
                        <PhotoReceived
                          photo={item?.media?.photo}
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
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!form.values.text.trim()) {
              form.reset();
              return;
            }
            handleSendMessage();
          }}
          className="flex flex-col bg-white gap-2"
        >
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 flex items-center justify-center bg-[#EDF0FB] rounded-[34px]">
              <label htmlFor="image-file">
                <Icon
                  icon="ic:outline-image"
                  color="#4534b8"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
                <FileInput
                  onChange={(value) => {
                    setFile(value);
                  }}
                  hidden
                  id="image-file"
                  accept="image/png,image/jpeg"
                />
              </label>
            </span>
            <span className="w-10 h-10 flex items-center justify-center bg-[#EDF0FB] rounded-[34px]">
              <label htmlFor="video-file">
                <Icon
                  icon="mdi:video-outline"
                  color="#4534b8"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
                <FileInput
                  onChange={(value) => {
                    setFile(value);
                  }}
                  hidden
                  id="video-file"
                  accept="video/mp4"
                />
              </label>
            </span>
            <span className="w-10 h-10 flex items-center justify-center bg-[#EDF0FB] rounded-[34px]">
              <Icon
                icon="ant-design:audio-outlined"
                color="#4534b8"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </span>
          </div>
          <div className="justify-between flex items-center">
            <Textarea
              id="no-scroll"
              classNames={{
                input:
                  "h-[64px] placeholder:text-[12px] !pt-[20px] bg-transparent border-0",
                root: "flex-1",
              }}
              autosize
              minRows={1}
              maxRows={10}
              onKeyDown={handleKeyDown}
              placeholder="Enter your message"
              {...form.getInputProps("text")}
            />
            <button type="submit">
              <Icon
                className="cursor-pointer"
                icon="carbon:send"
                color="#4534B8"
                height={32}
                width={32}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default GroupChatView;
