import { Drawer } from "@mantine/core";
import React from "react";
import SettingsTab from "./settingsTab";
import Navigation from "../mobileDrawer/navigation";

function SettingsDrawer({ opened, close }) {
  return (
    <Drawer onChange={close} opened={opened} onClose={close}>
      <Navigation />
      <SettingsTab close={close} />
    </Drawer>
  );
}

export default SettingsDrawer;
