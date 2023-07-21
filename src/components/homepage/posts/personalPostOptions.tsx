import { Icon } from "@iconify/react";
import { clsx } from "@mantine/core";
import React from "react";
import {
  deleteParticularPost,
  savePostAction,
} from "@/actions/postOptionActions";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import { Post } from "../../../../api/request.types";

function PersonalPostOptions({openDraft, setLoading, open, post }: {setLoading: any, openDraft: () => void, open: () => void, post: Post}) {
  const queryClient = useQueryClient();
  const user: any = useAtomValue(userDetails)
  const { pathname } = useRouter();
  const successAction = () => {
    if (pathname.includes("home"))
      queryClient.invalidateQueries(["all-posts"]);
    else if (pathname.includes("profile")) {
      queryClient.invalidateQueries(["user-activities", user?.user?.id]);
    } else queryClient.invalidateQueries(["single-posts", post?.id]);
  }
  const personalPostOptions = post?.is_repost ?
  [
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
        savePostAction(setLoading, post?.id, successAction),
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
      action: () => {
        deleteParticularPost(post?.id, setLoading, successAction);
      },
    },
  ] : pathname.includes("draft") ? [
    {
      name: "Publish post",
      icon: (
        <Icon
          color="#2A2A2A"
          icon="circum:bookmark-minus"
          height={24}
          width={24}
        />
      ),
      action: openDraft
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
      action: () => {
        deleteParticularPost(post?.id, setLoading, successAction);
      },
    },
  ]
  : [
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
        savePostAction(setLoading, post?.id, successAction),
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
      action: open,
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
      action: () => {
        deleteParticularPost(post?.id, setLoading, successAction);
      },
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
            "flex items-center whitespace-nowrap py-5 cursor-pointer leading-[19px] hover:bg-[#f1f3f5] gap-4"
          )}
          style={{paddingInline: "clamp(10px, 0.5vw, 20px)"}}
        >
          {item.icon}
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default PersonalPostOptions;
