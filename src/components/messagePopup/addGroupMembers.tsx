import { Icon } from "@iconify/react";
import { TextInput, clsx } from "@mantine/core";
import React, { useEffect, useState } from "react";
import useFollowings from "../../../hooks/useFollowings";
import useFollowers from "../../../hooks/useFollowers";
import { useAtomValue, useSetAtom } from "jotai";
import { popupFriend, userDetails } from "@/store";
import { useForm } from "@mantine/form";
import DefaultProfilePicture from "../profile/defaultProfilePicture";

function AddGroupMembers({ setAction }) {
  const user: any = useAtomValue(userDetails);
  const { data: followings, isLoading } = useFollowings(user?.user?.id);
  const { data: followers, isLoading: isDataLoading } = useFollowers(
    user?.user?.id
  );

  const setSelectedFriend = useSetAtom(popupFriend);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (followers && followings) {
      setFriends([...followers, ...followings]);
    }
  }, [followers, followings]);

  const form = useForm({
    initialValues: {
      search: "",
    },
  });

  return (
    <div className="grid h-full grid-rows-[auto_auto_1fr] gap-4 overflow-auto">
      <div className="flex justify-between max-[345px]:mx-2 mx-[14px]">
        <p className="flex items-center gap-4">
          <Icon
            onClick={() => setAction("friend-list")}
            className="cursor-pointer"
            icon="mdi:arrow-left"
            height={25}
            width={25}
          />
          <span className="text-[#2a2a2a] font-bold max-[345px]:text-base text-[18px] leading-[22px]">
            New Message
          </span>
        </p>
        <div className="flex items-center gap-[20px]">
          {/* <div
            onClick={() => setAction("group-chat-view")}
            className={clsx(
              !selected.length && "opacity-40 pointer-events-none",
              "bg-[#4534B8] cursor-pointer h-12 w-12 max-[345px]:w-8 max-[345px]:h-8 rounded-full flex items-center justify-center"
            )}
          >
            <Send2 size="20" color="#FFFFFF" />
          </div> */}
          <Icon
            icon="material-symbols:keyboard-arrow-down"
            className="cursor-pointer"
            width={28}
            height={28}
          />
        </div>
      </div>
      <p className="text-[#757575] pb-4 border-b mx-[14px] border-b-[#EDF0FB] text-[15px] leading-6">
        Select friend to start a chat.
      </p>
      <div className="flex flex-col gap-4 max-[345px]:mx-3 mx-[30px] overflow-auto">
        <TextInput
          classNames={{
            input:
              "h-[47px] !pl-[48px] placeholder:text-[#757575] bg-[#F4F4F4] rounded-[24px] border-0",
          }}
          className="rounded-[24px] pl-8 bg-[#F4F4F4]"
          placeholder="Search Friend"
          icon={<Icon height={24} width={24} icon="ri:search-line" />}
          {...form.getInputProps("search")}
        />
        <div
          id="no-scroll"
          className="flex-1 overflow-auto flex flex-col gap-4"
        >
          {friends.map((item, idx) =>
            item?.first_name?.includes(form.values.search) ||
            item?.last_name?.includes(form.values.search) ? (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-[19px]">
                  <div className="w-[52px] h-[52px] max-[345px]:w-10 max-[345px]:h-10">
                    {item?.photo_url ? (
                      <img
                        src={item?.photo_url}
                        className="w-full h-full rounded-full object-cover"
                        alt="profile picture of suggested friend"
                      />
                    ) : (
                      <DefaultProfilePicture
                        text="text-[80%]"
                        firstName={item?.first_name}
                        lastName={item?.last_name}
                      />
                    )}
                  </div>
                  <div className="gap-[]2px flex flex-col">
                    <p className="text-[#2A2A2A] font-semibold leading-6">
                      {item?.first_name} {item?.last_name}
                    </p>
                    <p className="text-[#757575] text-xs">@{item?.username}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedFriend(JSON.stringify(item));
                    setAction("begin chat");
                  }}
                  className="bg-[#DFE5FA] text-duduzili-violet py-2 px-4 text-xs font-medium  rounded-[32px]"
                >
                  Select
                </button>
                {/* <button
                  onClick={() => {
                    if (selected.includes(idx)) {
                      setSelected(selected.filter((item) => item !== idx));
                      return;
                    }
                    setSelected([...selected, idx]);
                  }}
                  className={clsx(
                    selected.includes(idx)
                      ? "bg-[#4534B8] text-white"
                      : "bg-[#DFE5FA] text-duduzili-violet",
                    " py-2 px-4 text-xs font-medium  rounded-[32px]"
                  )}
                >
                  {selected.includes(idx) ? (
                    <p className="flex items-center gap-2">
                      Selected
                      <span className="w-[14px] h-[14px] bg-white rounded-full font-semibold text-[10px] leading-4 flex items-center justify-center text-duduzili-violet">
                        {selected.indexOf(idx) + 1}
                      </span>
                    </p>
                  ) : (
                    "Select"
                  )}
                </button> */}
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default AddGroupMembers;
