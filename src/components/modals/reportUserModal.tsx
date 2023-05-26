import React, { useState } from "react";
import { Modal, LoadingOverlay } from "@mantine/core";
import { reportUserAction } from "@/actions/postOptionActions";
import { useQueryClient } from "@tanstack/react-query";

function ReportUserModal({id, opened, close }) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient()
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
        content: "py-6 px-8 max-w-[580px] rounded-[24px] flex flex-col overflow-auto",
        header: "!px-0 !pt-0 !pb-[2vh]",
        title: "font-semibold text-[20px] text-black leading-6",
        body: "overflow-auto !p-0",
      }}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
      }}
      opened={opened}
      onClose={close}
      title="Report User?"
      centered
    >
      <div className="flex flex-col">
        {reportReasons.map(({ title, details }, index) => (
          <div  onClick={() => {
            reportUserAction({ id }, setLoading, () => {
              queryClient.invalidateQueries(["all-posts"])
              close()
            }
          )
          }} key={index} className="flex cursor-pointer hover:bg-[#f0efef] flex-col gap-1 border-y-[#EDF0FB] border-y py-[2vh]">
            <h3 className="text-[#2A2A2A] font-semibold leading-[30px]">
              {title}
            </h3>
            <p className="leading-[30px] text-[#757575]">{details}</p>
          </div>
        ))}
      </div>
      <LoadingOverlay visible={loading} />
    </Modal>
  );
}

export default ReportUserModal;
