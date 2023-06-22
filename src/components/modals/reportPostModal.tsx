import React, { useState } from "react";
import { Modal, LoadingOverlay, clsx } from "@mantine/core";
import { reportPostAction } from "@/actions/postOptionActions";
import { useQueryClient } from "@tanstack/react-query";
import PrimaryButton from "../button/primaryButton";
import { showNotification } from "@mantine/notifications";

function ReportPostModal({ id, opened, close }) {
  const [loading, setLoading] = useState(false);
  //   reportPostAction({ id: post?.id }, setLoading, () =>
  //           queryClient.invalidateQueries(["all-posts"])
  //         )
  const queryClient = useQueryClient();
  const reportReasons = [
    {
      title: "Nudity",
      details: "This post contains pornographic or erotic content",
    },
    {
      title: "Violence",
      details: "This post has content that incites or promotes violence",
    },
    {
      title: "False Information",
      details:
        "This post has content in part or in whole which have been proven or can be proved to be false",
    },
    {
      title: "Hate Speech",
      details:
        "This post has content that attacks people or a person; or promotes hate or derogation of a person or people",
    },
  ];
  const [selected, setSelected] = useState("");
  return (
    <Modal
      size="38vw"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content:
          "py-6 !min-w-[260px] rounded-[24px] flex flex-col overflow-auto",
        header: "!px-0 !pt-0 !pb-1",
        title: "font-semibold text-[20px] text-black leading-6",
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
      title="Report Post?"
      centered
    >
      <h1 className="leading-[30px] text-[#757575] pb-[3vh]">
        Why are you reporting this post?
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
            return showNotification({
              message: "Please choose a reason",
              color: "red",
            });
          const data = new FormData();
          data.append("id", id);
          data.append("reason", selected);
          reportPostAction(data, setLoading, () => {
            queryClient.invalidateQueries(["all-posts"]);
            close();
          });
        }}
      />
      <LoadingOverlay visible={loading} />
    </Modal>
  );
}

export default ReportPostModal;
