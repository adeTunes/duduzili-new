import { Sms } from "iconsax-react";
import { NextPageX } from "../../types/next";
import SettingsLayout from "@/layout/settingslayout";
import { LoadingOverlay, clsx } from "@mantine/core";
import { Icon } from "@iconify/react";
import SearchIcon from "@/components/settings/searchIcon";
import SwithIcon from "@/components/settings/swithIcon";
import ActivityIcon from "@/components/settings/activityIcon";
import {
  allowDiscoveryByEmailAction,
  togglePrivacyAction,
  toggleRecommendationAction,
  toggleSearchAction,
} from "@/actions/settingsActions";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import UseSafetySettings from "../../hooks/useSafetySettings";
import { Loading } from "@/components/loading";

const SafetyAndPrivacy: NextPageX = () => {
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = UseSafetySettings();
  const queryClient = useQueryClient();
  const privacySettings = [
    {
      icon: <SearchIcon />,
      text: "Allow search engines to index your name",
      switch: (
        <SwithIcon
          active={data?.safety_settings?.allow_search_engine_index}
          onClick={() => {
            toggleSearchAction(setLoading, () => {
              queryClient.invalidateQueries(["safety-settings"]);
            });
          }}
        />
      ),
    },
    {
      icon: <ActivityIcon />,
      text: "Personalize recommendation based on activities",
      switch: (
        <SwithIcon
          active={data?.safety_settings?.personalize_recommendation}
          onClick={() => {
            toggleRecommendationAction(setLoading, () => {
              queryClient.invalidateQueries(["safety-settings"]);
            });
          }}
        />
      ),
    },
    {
      icon: <Sms size="20" variant="Outline" color="#4534B8" />,
      text: "Allow your profile to the discovered by email",
      switch: (
        <SwithIcon
          active={data?.safety_settings?.allow_discover_by_email}
          onClick={() => {
            allowDiscoveryByEmailAction(setLoading, () => {
              queryClient.invalidateQueries(["safety-settings"]);
            });
          }}
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
        {privacySettings.map((item, idx) => (
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
              <p
                className={clsx(
                  "text-[#2A2A2A]",
                  "text-[12px] max-w-[186px] font-semibold leading-4"
                )}
              >
                {item.text}
              </p>
            </div>
            {item.switch}
          </div>
        ))}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={clsx(
                "bg-[#F6F5FB]",
                "h-10  flex items-center justify-center w-10 rounded-full"
              )}
            >
              <Icon
                icon="ic:outline-lock-person"
                color="#4534B8"
                width="20"
                height="20"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p
                className={clsx(
                  "text-[#2A2A2A]",
                  "text-[12px] font-semibold leading-4"
                )}
              >
                Private Account
              </p>
              <p className="text-[#BDBDBD] text-[11px] leading-4">
                Non-followers will not see your content
              </p>
            </div>
          </div>
          <SwithIcon
            active={data?.safety_settings?.user?.is_private}
            onClick={() => {
              togglePrivacyAction(setLoading, () => {
                queryClient.invalidateQueries(["safety-settings"]);
              });
            }}
          />
        </div>
      </div>
      <LoadingOverlay visible={isLoading || loading} />
    </div>
  );
};
SafetyAndPrivacy.Layout = SettingsLayout;
SafetyAndPrivacy.LayoutProps = { tabName: "Safety & Privacy" };
export default SafetyAndPrivacy;