import { Icon } from "@iconify/react";
import { Menu } from "@mantine/core";
import { useRouter } from "next/router";
import { base64encode } from "nodejs-base64";
import React from "react";

function ViewProfileMenu({id}) {
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
        <Menu.Item onClick={() => location.assign(`/profile/post?user=${base64encode(String(id))}`)}>View Profile</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ViewProfileMenu;
