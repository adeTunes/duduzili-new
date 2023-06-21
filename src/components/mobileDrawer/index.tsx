import { Collapse, Drawer } from "@mantine/core";
import React from "react";
import MainSidebar from "./mainSidebar";
import Link from "next/link";
import CommunityPostsSidebar from "./communityPostsSidebar";
import { useRouter } from "next/router";
import CommunityDetailsSidebar from "./communitySidebar";
import FollowSidebar from "./followSidebar";
import MyProfileSidebar from "./myProfileSidebar";
import Navigation from "./navigation";
import DiscoverPeopleSidebar from "./discoverPeopleSidebar";
import InviteFriendsSidebar from "./inviteFriendsSidebar";
import PendingRequestsSidebar from "./pendingRequestsSidebar";

function MobileDrawer({ opened, close }) {
  const renderedSidebar = {
    "/home": <MainSidebar />,
    "/communities/discover": <MainSidebar />,
    "/about-us": <MainSidebar />,
    "/communities/joined": <MainSidebar />,
    "/faq": <MainSidebar />,
    "/support": <MainSidebar />,
    "/communities/posts": <CommunityPostsSidebar />,
    "/discover-people": <DiscoverPeopleSidebar />,
    "/friends": <DiscoverPeopleSidebar />,
    "/invite-friends": <InviteFriendsSidebar />,
    "/notifications": <DiscoverPeopleSidebar />,
    "/privacy-policy": <DiscoverPeopleSidebar />,
    "/search": <DiscoverPeopleSidebar />,
    "/trending": <DiscoverPeopleSidebar />,
  };

  const { pathname } = useRouter();

  return (
    <Drawer
      classNames={{
        content: "flex flex-col overflow-auto",
        body: "flex-1 !px-2 flex flex-col overflow-auto",
      }}
      opened={opened}
      onClose={close}
    >
      <Navigation />
      {renderedSidebar[pathname] ? (
        renderedSidebar[pathname]
      ) : pathname.includes("pending-requests") ? (
        <PendingRequestsSidebar />
      ) : pathname.includes("/my-profile") ? (
        <MyProfileSidebar />
      ) : pathname.includes("/friend") || pathname.includes("/posts") ? (
        <MainSidebar />
      ) : pathname.includes("/communities") ? (
        <CommunityDetailsSidebar />
      ) : pathname.includes("/followers") || pathname.includes("/following") ? (
        <FollowSidebar />
      ) : null}
    </Drawer>
  );
}

export default MobileDrawer;
