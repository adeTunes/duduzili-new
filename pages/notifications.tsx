import DiscoverSuggested from "@/components/discover/discoverSuggested";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import TrendingPosts from "@/components/homepage/sidebar/trendingPosts";
import NotificationCard from "@/components/notifications/notificationCard";
import { ArrowLeft } from "iconsax-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import UseNotifications from "../hooks/useNotifications";
import { readAllNotifications } from "../api/apiRequests";
import { showNotification } from "@mantine/notifications";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "@mantine/core";

type Notification = {
  title: string;
  day: string;
  time: string;
  action: "like" | "sticker-reward" | "post-comment" | "friend-request";
  unread: boolean;
}[];

function Friends() {
  const { back } = useRouter();
  const { data } = UseNotifications();
  const [notifications, setNotifications] = useState([]);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const markAsRead = () => {
    setLoading(true);
    readAllNotifications()
      .then(({ data }) => {
        showNotification({
          message: data?.message,
        });
        queryClient.invalidateQueries(["notifications"]);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false)
        errorMessageHandler(e);
      });
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data?.notifications?.reduce((acc, item) => {
          acc.push({
            title: `${item?.sender?.first_name} ${item?.sender?.last_name} ${item?.notice}${item?.post?.text ? `: ${item?.post?.text}` : ""}`,
            day: item?.date?.includes("now")
              ? item?.date
              : item?.date?.includes("day") ||
                item?.date?.includes("min") ||
                item?.date?.includes("sec") ||
                item?.date?.includes("hr")
              ? `${item?.date} ago`
              : item?.date,
            unread: !item?.read,
            action: item?.notification_type,
          });
          return acc;
        }, [])
      );
    }
  }, [data]);

  // const notificationsArr: Notification = [
  //   {
  //     title:
  //       "Ayodele Davies liked your post: If you are will be great in life, do somet...",
  //     action: "like",
  //     day: "Today",
  //     time: "11.30AM",
  //     unread: false,
  //   },
  //   {
  //     title:
  //       "Ayodele Davies awarded your post with a Leop sticker: If you are will be...",
  //     action: "sticker-reward",
  //     day: "Yesterday",
  //     time: "11.30AM",
  //     unread: false,
  //   },
  //   {
  //     title:
  //       "Ayodele Davies commented on your post: If you are will be great in life, t...",
  //     action: "post-comment",
  //     day: "12d ago",
  //     time: "11.30AM",
  //     unread: true,
  //   },
  //   {
  //     title: "Ayodele Davies sent you a friend request",
  //     action: "friend-request",
  //     day: "11/12/2020",
  //     time: "11.30AM",
  //     unread: false,
  //   },
  // ];

  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <main className="bg-[#FBFBFB] h-full overflow-auto py-[3vh] relative max-w-[1131px] justify-between gap-[50px] flex">
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-[790px]:flex-1 max-[450px]:min-w-[250px] min-w-[400px] max-w-[717px] flex flex-col gap-[34px]"
          >
            <div className="flex justify-between items-center">
              <div onClick={back} className="flex cursor-pointer items-center gap-10">
                <ArrowLeft
                  
                  size="32"
                  color="#2A2A2A"
                  variant="Outline"
                />
                <p style={{fontSize: "clamp(18px, 1.48vw, 24px)"}} className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                  Notifications
                </p>
              </div>
              <p
                onClick={markAsRead}
                className=" text-duduzili-blue cursor-pointer font-semibold leading-6"
                style={{fontSize: "clamp(12px, 0.96vw, 16px)"}}
              >
                {loading ? <Loader size="sm" /> : "Mark all as read"}
              </p>
            </div>
            <div
              className="bg-white rounded-2xl max-[480px]:p-3 p-6 flex flex-col gap-2"
              style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
            >
              {notifications?.map(({ title, action, day, unread }, idx) => (
                <NotificationCard
                  key={idx}
                  title={title}
                  action={action}
                  day={day}
                  unread={unread}
                />
              ))}
            </div>
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] max-[790px]:hidden pb-[80px] min-w-[300px] max-w-[400px] overflow-auto flex flex-col gap-6"
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
