import { Icon } from "@iconify/react";
import { clsx } from "@mantine/core";
import React from "react";
import { savePostAction } from "@/actions/postOptionActions";
import { useQueryClient } from "@tanstack/react-query";

function PersonalPostOptions({ setLoading, post }) {
  const queryClient = useQueryClient();
  const personalPostOptions = [
    {
      name: "Save post",
      icon: (
        <Icon
          color="#2A2A2A"
          icon="circum:bookmark-minus"
          height={24}
          width={24}
        />
      ),
      action: () =>
        savePostAction(setLoading, post?.id, () =>
          queryClient.invalidateQueries(["all-posts"])
        ),
    },
    {
      name: "Edit post",
      icon: (
        <Icon
          color="#2A2A2A"
          icon="fluent:edit-16-regular"
          height={24}
          width={24}
        />
      ),
      action: () => {},
    },
    {
      name: "Pin post",
      icon: (
        <Icon
          color="#2A2A2A"
          icon="ph:push-pin-simple"
          height={24}
          width={24}
        />
      ),
      action: () => {},
    },
    {
      name: "Delete Post",
      icon: (
        <Icon
          icon="material-symbols:delete-outline"
          color="#D40000"
          height={24}
          width={24}
        />
      ),
      action: () => {},
    },
  ];
  return (
    <div className="flex flex-col">
      {personalPostOptions.map((item, idx, arr) => (
        <div
          key={idx}
          onClick={item.action}
          className={clsx(
            idx !== arr.length - 1 && "border-b border-b-[#DFE5FA]",
            item.name.toLocaleLowerCase().includes("delete")
              ? "text-[#D40000]"
              : "text-[#2A2A2A]",
            "flex items-center whitespace-nowrap px-5 py-5 cursor-pointer leading-[19px] hover:bg-[#f1f3f5] gap-4"
          )}
        >
          {item.icon}
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default PersonalPostOptions;
