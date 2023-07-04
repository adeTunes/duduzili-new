import { Icon } from "@iconify/react";
import { Menu } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

function ViewProfileMenu({id}) {
    const {push} = useRouter()
  return (
    <Menu>
      <Menu.Target>
        <Icon
          height={24}
          className="cursor-pointer"
          width={24}
          icon="carbon:overflow-menu-vertical"
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => push(`/friend/${id}/post`)}>View Profile</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ViewProfileMenu;
