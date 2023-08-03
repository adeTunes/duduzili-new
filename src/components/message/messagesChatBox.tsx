import { Icon } from "@iconify/react";
import { FileInput, Loader, Modal, Skeleton, Textarea } from "@mantine/core";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useState, useEffect, useRef, useMemo } from "react";
import MessageReceived from "./messageReceived";
import MessageSent from "./messageSent";
import {
  chatFriendOptions,
  currentChatFriend,
  selectedFriendToChat,
  selectedMessage,
  userDetails,
} from "@/store";
import { useForm } from "@mantine/form";
import AttachMedia from "./attach-media";
import { useQueryClient } from "@tanstack/react-query";
import DefaultProfilePicture from "../profile/defaultProfilePicture";
import ViewProfileMenu from "./viewProfileMenu";
import { useDisclosure } from "@mantine/hooks";
import { uploadToCloudinary } from "../../../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import PhotoReceived from "./photoReceived";
import PhotoSent from "./photoSent";
import VideoSent from "./videoSent";
import VideoReceived from "./videoReceived";
import { notify } from "../../../utils/notification-handler";

function MessagesChatBox() {
  const [messageFriend, setSelectedMessage] = useAtom(selectedMessage);
  const friend: any = useAtomValue(currentChatFriend)
  const setFriend = useSetAtom(currentChatFriend)
  const user: any = useAtomValue(userDetails);
  const [messages, setMessages] = useState(null);
  const [chatOptions, setChatOptions] = useAtom(chatFriendOptions);
  const [chatList, setChatList] = useAtom(selectedFriendToChat);
  const [file, setFile] = useState(null);
  const [source, setSource] = useState<string | ArrayBuffer>("");
  const [opened, { open, close }] = useDisclosure(false);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [attachMediaOpened, setAttachMediaOpened] = useState(false);
  const [reconnectionCount, setReconnectionCount] = useState(0);
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

  const formatDate = (date) => {
    const currentDate = new Date();
    const messageDate = new Date(date);

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
    return dateKey
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
          notify({ message: "Something went wrong" });
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
            const dateKey = formatDate(message.message[0].date_added);
            setMessages((prev) => {
              return {
                ...prev,
                [dateKey]: prev[dateKey]
                  ? [...prev[dateKey], message.message]
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
          const date = formatDate(message.message.date_added);
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
    const foundFriend = chatList?.find(
      (item) => item?.username === friend?.username
    );
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
      if (foundFriend) {
        setChatOptions("chat initiated");
      }
      scrollToBottom();
      queryClient.invalidateQueries(["conversations"]);
    } catch (error) {
      notify({ message: "Something went wrong" });
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
    <div
      id="no-scroll"
      className="grid grid-rows-[auto_1fr_auto] overflow-auto flex-1 flex-col gap-6"
    >
      <div className="flex pb-4 border-b border-b-[#EDF0FB] items-center justify-between">
        <div className="flex items-center gap-[19px]">
          <div className="h-[52px] max-[400px]:w-[35px] max-[400px]:h-[35px] w-[52px]">
            {friend?.photo_url ? (
              <img
                src={friend?.photo_url}
                className="h-full w-full object-cover rounded-full"
                alt=""
              />
            ) : (
              <DefaultProfilePicture
                firstName={friend?.first_name}
                lastName={friend?.last_name}
                text="text-[100%]"
              />
            )}
          </div>
          <div className="flex flex-col gap-[2px]">
            <p className="text-[18px] max-[400px]:text-[15px] font-semibold text-[#222222] leading-[22px]">
              {friend?.first_name} {friend?.last_name}
            </p>
            <p className="text-[14px] max-[400px]:text-xs leading-[17px] text-[#2A2A2A]">
              @{friend?.username}
            </p>
          </div>
        </div>
        <ViewProfileMenu id={friend?.id} />
      </div>
      <div
        ref={chatContainerRef}
        id="messages no-scroll"
        className="flex messages-no-scroll overflow-auto flex-1 flex-col gap-5"
      >
        {!messages ? (
          <Skeleton className="rounded-l-2xl rounded-tr-2xl" />
        ) : (
          Object.entries(messages)?.map(([date, chats]: any, idx) => (
            <div key={date} className="day-container">
              <div className="flex-col day gap-3 flex">
                <span className="date">
                  <span className=" bg-[#EDF0FB] p-2 rounded-2xl">{date}</span>
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
                          photo={item?.media?.photo}
                          time={item?.date_added}
                          key={item?.id}
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

        {/* <SingleEmojiSent /> */}
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
        className="flex items-center relative justify-between gap-4"
      >
        <div className="flex pl-6 items-center gap-4 flex-1 bg-[#EDF0FB] rounded-[40px]">
          <div className="flex items-center max-[490px]:hidden gap-3">
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
            <Icon
              icon="ant-design:audio-outlined"
              color="#4534b8"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            {/* <AudioOptions
              setStart={setStart}
              setRecordedAudio={setRecordedAudio}
              setAudio={setAudio}
              setOpened={setAudioMenuOpened}
              opened={audioMenuOpened}
            /> */}
          </div>
          <div className="max-[490px]:flex items-center hidden">
            <AttachMedia
              setOpened={setAttachMediaOpened}
              opened={attachMediaOpened}
              setFile={setFile}
            />
          </div>
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

      <Modal
        closeOnClickOutside={false}
        centered
        classNames={{
          close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
          overlay: "z-[201]",
          body: "overflow-auto pb-0 !px-0 max-[420px]:px-0",
          header:
            "overflow-auto max-[420px]:px-0 !px-0 !pt-0 !pb-6 max-[420px]:!pb-2 border-b border-b-[#EDF0FB]",
          inner: "bottom-[30px] z-[201]",
          title: "font-semibold text-[20px] text-black leading-6",
          content:
            "py-6 max-[420px]:py-2 px-8 gap-4 flex max-[420px]:px-1 flex-col overflow-auto rounded-[24px]",
        }}
        size="lg"
        styles={{
          content: {
            boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
          },
        }}
        opened={opened}
        onClose={() => {
          // setSource("");
          // setFile(null);
          close();
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setMediaLoading(true);
            const data = new FormData();
            if (file?.type?.includes("image")) {
              data.append("photo", file);
            } else data.append("video", file);
            uploadToCloudinary(data)
              .then(({ data }) => {
                if (!data?.data) {
                  return notify({
                    message: "Something went wrong!",
                    color: "red",
                  });
                }
                let media;
                if (data?.data?.photo) {
                  media = { media: String(data?.data?.photo), type: "photo" };
                } else if (data?.data?.video) {
                  media = { media: data?.data?.video, type: "video" };
                }
                handleSendMessage(media);
                setMediaLoading(false);
                close();
                // setFile(null);
              })
              .catch((e) => {
                setMediaLoading(false);
                errorMessageHandler(e);
              });
          }}
          className="flex flex-col  gap-6"
        >
          <div
            style={{
              width: "clamp(220px,76.5%,400px)",
              height: "clamp(240px, 47.2vw, 400px)",
            }}
            className="h-[300px] self-center"
          >
            {file?.type?.includes("image") ? (
              <img
                src={source as string}
                className="w-full h-full object-cover rounded-[29px]"
                alt=""
              />
            ) : (
              <video
                src={source as string}
                controls
                className="w-full h-full rounded-[29px] object-cover"
              ></video>
            )}
          </div>
          <button
            disabled={mediaLoading}
            className="self-end p-4 max-[500px]:p-3 bg-duduzili-violet rounded-full"
            type="submit"
          >
            {mediaLoading ? (
              <Loader size="sm" />
            ) : (
              <Icon
                className="cursor-pointer w-8 h-8 max-[500px]:w-4 max-[500px]:h-4"
                icon="carbon:send"
                color="white"
              />
            )}
          </button>
        </form>
      </Modal>
    </div>
  ) : (
    <></>
  );
}

export default MessagesChatBox;
