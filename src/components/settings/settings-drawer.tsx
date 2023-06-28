import { Drawer } from "@mantine/core";
import React from "react";
import SettingsTab from "./settingsTab";
import Navigation from "../mobileDrawer/navigation";

function SettingsDrawer({ opened, close }) {
  return (
    <Drawer classNames={{
      inner: "z-[9999999]",
    }} onChange={close} opened={opened} onClose={close}>
      <SettingsTab close={close} />
    </Drawer>
  );
}

export default SettingsDrawer;
