import DiscoverSuggested from "@/components/discover/discoverSuggested";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import TrendingPosts from "@/components/homepage/sidebar/trendingPosts";
import NotificationCard from "@/components/notifications/notificationCard";
import { ArrowLeft } from "iconsax-react";
import { useRouter } from "next/router";
import React from "react";

type Notification = {
  title: string;
  day: string;
  time: string;
  action: "post-like" | "sticker-reward" | "post-comment" | "friend-request";
  unread: boolean;
}[];

function Friends() {
  const { back } = useRouter();

  const notificationsArr: Notification = [
    {
      title:
        "Ayodele Davies liked your post: If you are will be great in life, do somet...",
      action: "post-like",
      day: "Today",
      time: "11.30AM",
      unread: false,
    },
    {
      title:
        "Ayodele Davies awarded your post with a Leop sticker: If you are will be...",
      action: "sticker-reward",
      day: "Yesterday",
      time: "11.30AM",
      unread: false,
    },
    {
      title:
        "Ayodele Davies commented on your post: If you are will be great in life, t...",
      action: "post-comment",
      day: "12d ago",
      time: "11.30AM",
      unread: true,
    },
    {
      title: "Ayodele Davies sent you a friend request",
      action: "friend-request",
      day: "11/12/2020",
      time: "11.30AM",
      unread: false,
    },
  ];

  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] h-full overflow-auto py-[50px] relative max-w-[1131px] justify-between w-[80%] mx-auto gap-[50px] flex">
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-w-[717px] flex flex-col gap-[34px]"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-10">
                <ArrowLeft
                  className="cursor-pointer"
                  onClick={back}
                  size="32"
                  color="#2A2A2A"
                  variant="Outline"
                />
                <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                  Notifications
                </p>
              </div>
              <p className=" text-duduzili-blue cursor-pointer font-semibold leading-6">
                Mark all as read
              </p>
            </div>
            <div
              className="bg-white rounded-2xl p-6 flex flex-col gap-2"
              style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
            >
              {notificationsArr.map(
                ({ title, action, day, time, unread }, idx) => (
                  <NotificationCard
                    key={idx}
                    title={title}
                    action={action}
                    day={day}
                    time={time}
                    unread={unread}
                  />
                )
              )}
            </div>
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] overflow-auto max-w-[325px] flex flex-col gap-6"
          >
            <DownloadApp />
            <TrendingPosts />
            <CompanyInfo />
          </aside>
          <FixedMessagesButton />
        </main>
      </div>
    </div>
  );
}

export default Friends;
