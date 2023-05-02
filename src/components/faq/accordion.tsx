import { Accordion } from "@mantine/core";
import React from "react";
import { IconPlus } from "@tabler/icons-react";

function FaqAccordion() {
  return (
    <Accordion
      chevron={<IconPlus size="1rem" />}
      classNames={{ control: "h-[78px]" }}
      styles={{
        chevron: {
          "&[data-rotate]": {
            transform: "rotate(45deg)",
          },
        },
      }}
      defaultValue="item-1"
    >
      <Accordion.Item value="item-1">
        <Accordion.Control>Why do account get suspended?</Accordion.Control>
        <Accordion.Panel>
          We're committed to actively manage the public conversations on our
          platform to ensure a safe environment for everyone on Duduzili. Any
          account that violates our terms may or will be suspended. Why might
          your account be suspended? Spam activity: Most of the accounts
          suspended is because they are spam accounts, or fake, and these types
          of accocunts introduce security risks for everyone using our
          platforms. Abusive posts or behavior: We may suspend an account if it
          has been reported to us as violating our terms surrounding abuse. When
          an account engages in abusive behavior, like sending threats to others
          or impersonating other accounts, we may suspend it or in some cases,
          permanently ban the user. How to unsuspend your Duduzili account: If
          you think that your account was suspended in error, you may be able to
          unsuspend it by contacting our support team at support@gmail.com
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="item-2">
        <Accordion.Control>Who can see my profile?</Accordion.Control>
        <Accordion.Panel>panel-2</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Control>
          How to set your account to private?
        </Accordion.Control>
        <Accordion.Panel>panel-2</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item-4">
        <Accordion.Control>
          How to report Abusive content shared on Duduzili
        </Accordion.Control>
        <Accordion.Panel>panel-2</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item-5">
        <Accordion.Control>How to report a user on Duduzili?</Accordion.Control>
        <Accordion.Panel>panel-2</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item-6">
        <Accordion.Control>How to block someone on Duduzili?</Accordion.Control>
        <Accordion.Panel>panel-2</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item-7">
        <Accordion.Control>
          How to unblock someone on Duduzili?
        </Accordion.Control>
        <Accordion.Panel>panel-2</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default FaqAccordion;
