import { NextPageX } from "../../types/next";
import SettingsLayout from "@/layout/settingslayout";
import CommentIcon from "@/components/settings/commentIcon";
import NotificationSettingsBox from "@/components/settings/notificationSettingsBox";
import NotificationsIcon from "@/components/settings/notificationsIcon";
import RecommendationIcon from "@/components/settings/recommendationIcon";

const Notifications: NextPageX = () => {
  const notificationsMessageSettings = [
    {
      icon: <CommentIcon />,
      heading: "Allow Adult Content",
    },
    {
      icon: <CommentIcon />,
      heading: "Autoplay Media",
    },
    {
      icon: <CommentIcon />,
      heading: "Reduce Animation",
    },
    {
      icon: <CommentIcon />,
      heading: "Allow Comments",
    },
  ];
  const notificationsActivitySettings = [
    {
      icon: <NotificationsIcon />,
      heading: "Mention of Username",
    },
    {
      icon: <NotificationsIcon />,
      heading: "Comment on your Post",
    },
    {
      icon: <NotificationsIcon />,
      heading: "Likes on your Post",
    },
    {
      icon: <NotificationsIcon />,
      heading: "New Followers",
    },
    {
      icon: <NotificationsIcon />,
      heading: "Activity on your Comments",
    },
    {
      icon: <NotificationsIcon />,
      heading: "Activity on post you are in",
    },
    {
      icon: <NotificationsIcon />,
      heading: "Replies on your comment",
    },
  ];
  const RecommendationSettings = [
    {
      icon: <RecommendationIcon />,
      heading: "Trending Post",
    },
    {
      icon: <NotificationsIcon />,
      heading: "Broadcast Recommendation",
    },
  ];

  return (
    <div className="flex overflow-auto flex-1 flex-col gap-[22px]">
      <div className="flex flex-col gap-[10px]">
        <NotificationSettingsBox
          settingsArr={notificationsMessageSettings}
          boxHeading="Messages"
        />
        <NotificationSettingsBox
          settingsArr={notificationsActivitySettings}
          boxHeading="Activity"
        />
        <NotificationSettingsBox
          settingsArr={RecommendationSettings}
          boxHeading="Recommendations"
        />
      </div>
    </div>
  );
};
Notifications.Layout = SettingsLayout;
Notifications.LayoutProps = { tabName: "Notifications" };
export default Notifications;
