import { NextPageX } from "../../types/next";
import SettingsLayout from "@/layout/settingslayout";
import CommentIcon from "@/components/settings/commentIcon";
import NotificationSettingsBox from "@/components/settings/notificationSettingsBox";
import NotificationsIcon from "@/components/settings/notificationsIcon";
import RecommendationIcon from "@/components/settings/recommendationIcon";
import UseNotificationSettings from "../../hooks/useNotificationSettings";
import SwithIcon from "@/components/settings/swithIcon";
import { LoadingOverlay } from "@mantine/core";

const Notifications: NextPageX = () => {
  const {data, isLoading} = UseNotificationSettings()

  const notificationsMessageSettings = [
    {
      icon: <CommentIcon />,
      heading: "Inbox Messages",
      switch: <SwithIcon onClick={() => {}} active={data?.notification_settings?.inbox_messages} />,
    },
    {
      icon: <CommentIcon />,
      heading: "Chat Messages",
      switch: <SwithIcon onClick={() => {}} active={data?.notification_settings?.chat_messages} />,
    },
    {
      icon: <CommentIcon />,
      heading: "Chat Requests",
      switch: <SwithIcon onClick={() => {}} active={data?.notification_settings?.chat_requests} />,
    },
  ];
  const notificationsActivitySettings = [
    {
      icon: <NotificationsIcon />,
      heading: "Mention of Username",
      switch: <SwithIcon onClick={() => {}} active={data?.notification_settings?.username_mention} />,
    },
    {
      icon: <NotificationsIcon />,
      heading: "Comment on your Post",
      switch: <SwithIcon onClick={() => {}} active={data?.notification_settings?.post_comment} />,
    },
    {
      icon: <NotificationsIcon />,
      heading: "Likes on your Post",
      switch: <SwithIcon onClick={() => {}} active={data?.notification_settings?.post_like} />,
    },
    {
      icon: <NotificationsIcon />,
      heading: "New Followers",
      switch: <SwithIcon onClick={() => {}} active={data?.notification_settings?.new_follower} />,
    },
    {
      icon: <NotificationsIcon />,
      heading: "Activity on your Comments",
      switch: <SwithIcon onClick={() => {}} active={data?.notification_settings?.comment_activity} />,
    },
    {
      icon: <NotificationsIcon />,
      heading: "Activity on post you are in",
      switch: <SwithIcon onClick={() => {}} active={data?.notification_settings?.post_activity} />,
    },
    {
      icon: <NotificationsIcon />,
      heading: "Replies on your comment",
      switch: <SwithIcon onClick={() => {}} active={data?.notification_settings?.comment_replies} />,
    },
  ];
  const RecommendationSettings = [
    {
      icon: <RecommendationIcon />,
      heading: "Trending Post",
      switch: <SwithIcon onClick={() => {}} active={data?.notification_settings?.trending_posts} />,
    },
    {
      icon: <NotificationsIcon />,
      heading: "Broadcast Recommendation",
      switch: <SwithIcon onClick={() => {}} active={data?.notification_settings?.broadcasts} />,
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
      <LoadingOverlay visible={isLoading} />
    </div>
  );
};
Notifications.Layout = SettingsLayout;
Notifications.LayoutProps = { tabName: "Notifications" };
export default Notifications;
