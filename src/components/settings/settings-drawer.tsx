import { Drawer } from "@mantine/core";
import React from "react";
import SettingsTab from "./settingsTab";

function SettingsDrawer({ opened, close }) {
  return (
    <Drawer onChange={close} opened={opened} onClose={close}>
      <SettingsTab />
    </Drawer>
  );
}

export default SettingsDrawer;
