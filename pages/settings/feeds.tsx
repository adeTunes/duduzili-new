import { Sms } from "iconsax-react";
import { NextPageX } from "../../types/next";
import SettingsLayout from "@/layout/settingslayout";
import { LoadingOverlay, clsx } from "@mantine/core";
import { Icon } from "@iconify/react";
import SwithIcon from "@/components/settings/swithIcon";
import ActivityIcon from "@/components/settings/activityIcon";
import AdultIcon from "@/components/settings/adultIcon";
import AutoplayIcon from "@/components/settings/autoplayIcon";
import DevicesIcon from "@/components/settings/devicesIcon";
import CommentIcon from "@/components/settings/commentIcon";
import UseFeedSettings from "../../hooks/useFeedSettings";

const Feeds: NextPageX = () => {
  // ["feed-settings"]
  const { data, isLoading } = UseFeedSettings();
  const feedsSettings = [
    {
      icon: <AdultIcon />,
      heading: "Allow Adult Content",
      subheading: "Enable to view adult contents",
      switch: (
        <SwithIcon
          onClick={() => {}}
          active={data?.content_settings?.allow_adult_content}
        />
      ),
    },
    {
      icon: <AutoplayIcon />,
      heading: "Autoplay Media",
      subheading: "Play videos, audios and gifs automatically",
      switch: (
        <SwithIcon
          onClick={() => {}}
          active={data?.content_settings?.autoplay_media}
        />
      ),
    },
    {
      icon: <DevicesIcon />,
      heading: "Reduce Animation",
      subheading: "Reduce award-related animations",
      switch: (
        <SwithIcon
          onClick={() => {}}
          active={data?.content_settings?.reduce_animations}
        />
      ),
    },
    {
      icon: <CommentIcon />,
      heading: "Allow Comments",
      subheading: "Allow people to comment on your posts",
      switch: (
        <SwithIcon
          onClick={() => {}}
          active={data?.content_settings?.allow_comments}
        />
      ),
    },
  ];

  return (
    <div className="flex overflow-auto flex-1 flex-col gap-[22px]">
      <div
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
        className="flex flex-col gap-[25px] px-4 py-6 rounded-lg bg-white"
      >
        {feedsSettings.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={clsx(
                  "bg-[#F6F5FB]",
                  "h-10  flex items-center justify-center w-10 rounded-full"
                )}
              >
                {item.icon}
              </div>
              <div className="flex flex-col gap-1">
                <p
                  className={clsx(
                    "text-[#2A2A2A]",
                    "text-[12px] font-semibold leading-4"
                  )}
                >
                  {item.heading}
                </p>
                <p className="text-[#BDBDBD] text-[11px] leading-4">
                  {item.subheading}
                </p>
              </div>
            </div>
            {item.switch}
          </div>
        ))}
      </div>
      <LoadingOverlay visible={isLoading} />
    </div>
  );
};
Feeds.Layout = SettingsLayout;
Feeds.LayoutProps = { tabName: "Feeds" };
export default Feeds;
