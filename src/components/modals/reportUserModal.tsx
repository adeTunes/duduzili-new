import React, { useState } from "react";
import { Modal, LoadingOverlay, clsx } from "@mantine/core";
import { reportUserAction } from "@/actions/postOptionActions";
import { useQueryClient } from "@tanstack/react-query";
import PrimaryButton from "../button/primaryButton";
import { notify } from "../../../utils/notification-handler";

function ReportUserModal({ id, opened, close }) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState("");
  const reportReasons = [
    {
      title: "Cyber Stalking",
      details:
        "This user is collecting my personal information and data to trace or monitor me",
    },
    {
      title: "Unwanted Acquaintance",
      details: "I'm not interested in this user",
    },
    {
      title: "Unknown Persom",
      details: "I don't know this person in real life, and don't wish to",
    },
    {
      title: "Unnecessary Bugging",
      details: "This user is bugging me with demands",
    },
    {
      title: "Bullying or Harassment",
      details: "I'm being bullied or harassed by this user",
    },
  ];
  return (
    <Modal
      size="38vw"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content:
          "py-6 min-w-[260px] max-[450px]:min-w-[100%] max-[450px]:text-[14px] min-[450px]:min-w-[425px]  rounded-[24px] flex flex-col overflow-auto",
        header: "!px-0 !pt-0 !pb-1",
        title:
          "font-semibold max-[450px]:text-[16px] text-[20px] text-black leading-6",
        body: "overflow-auto !p-0 grid grid-rows-[auto_1fr_auto]",
      }}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
          paddingInline: "min(2vh, 32px)",
        },
      }}
      opened={opened}
      onClose={() => {
        setSelected("");
        close();
      }}
      title="Report User?"
      centered
    >
      <h1 className="leading-[30px] text-[#757575] pb-[3vh]">
        Why are you reporting this user?
      </h1>
      <div id="no-scroll" className="flex flex-col pb-[3vh] overflow-auto">
        {reportReasons.map(({ title, details }, index) => (
          <div
            key={index}
            onClick={() => setSelected(title)}
            className={clsx(
              selected === title && "bg-[#f0efef]",
              "flex cursor-pointer hover:bg-[#f0efef] flex-col gap-1 border-y-[#EDF0FB] border-y py-[2vh]"
            )}
          >
            <h3 className="text-[#2A2A2A] font-semibold leading-[30px]">
              {title}
            </h3>
            <p className="leading-[30px] text-[#757575]">{details}</p>
          </div>
        ))}
      </div>
      <PrimaryButton
        text="Report"
        className="w-full"
        onClick={() => {
          if (!selected)
            return notify({
              message: "Please choose a reason",
              color: "red",
            });
          const formData = new FormData();
          formData.append("id", String(id));
          reportUserAction(formData, setLoading, () => {
            queryClient.invalidateQueries(["all-posts"]);
            queryClient.invalidateQueries(["random-communities-posts"]);
            close();
          });
        }}
      />
      <LoadingOverlay visible={loading} />
    </Modal>
  );
}

export default ReportUserModal;
