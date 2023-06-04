import { LoadingOverlay, clsx } from "@mantine/core";
import { TicketStar } from "iconsax-react";
import React, { useEffect, useState } from "react";
import PrimaryButtonLarge from "../button/primaryButtonLarge";
import { rewardPostWithSticker } from "../../../api/apiRequests";
import StickersList from "./stickersList";
import { showNotification } from "@mantine/notifications";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function SelectStickerViewModal({
  postId,
  openSuccess,
  close,
}: {
  postId?: any;
  openSuccess?: () => void;
  close?: () => void;
}) {
  const availableStickers = [
    {
      name: "Butfly",
      amount: "200",
    },
    {
      name: "Dragfly",
      amount: "500",
    },
    {
      name: "Turk",
      amount: "1000",
    },
    {
      name: "Pcock",
      amount: "1500",
    },
    {
      name: "Jagr",
      amount: "2500",
    },
    {
      name: "Leop",
      amount: "3000",
    },
    {
      name: "Tigr",
      amount: "5000",
    },
    {
      name: "Pand",
      amount: "10000",
    },
    {
      name: "Crocs",
      amount: "15000",
    },
    {
      name: "Drag",
      amount: "20000",
    },
    {
      name: "Lyon",
      amount: "50000",
    },
    {
      name: "Eleph",
      amount: "100000",
    },
  ];
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [amount, setAmount] = useState(null);
  useEffect(() => {
    if (selected.length) {
      setAmount(
        selected.reduce((acc, item) => {
          acc += +item;
          return acc;
        }, 0)
      );
    }
  }, [selected.length]);
  return (
    <>
      <div className="overflow-auto">
        <div
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))",
          }}
          className="grid gap-10"
        >
          {availableStickers.map((item, idx) => (
            <StickersList
              selected={selected}
              setSelected={setSelected}
              item={item}
            />
          ))}
        </div>
      </div>
      <PrimaryButtonLarge
        text="Proceed"
        className={clsx(
          !selected.length && "opacity-20 pointer-events-none",
          "mt-[30px]"
        )}
        onClick={() => {
          if (!amount)
            return showNotification({
              message: "Please select a sticker to proceed",
            });
            setLoading(true)
          const data = new FormData();
          data.append("post_id", postId);
          data.append("amount", amount);
          rewardPostWithSticker(data)
            .then(({ data }) => {
              setLoading(false)
              if (data?.message !== "successful") {
                if (data?.data?.non_field_errors) {
                  showNotification({
                    message: String(data?.data?.non_field_errors),
                    color: "red",
                  });
                } else
                  showNotification({
                    message: String(data?.data),
                    color: "red",
                  });
              } else {
                close();
                openSuccess();
              }
            })
            .catch((e) => {
              setLoading(false)
              errorMessageHandler(e);
            });
        }}
      />
      <LoadingOverlay visible={loading} />

    </>
  );
}

export default SelectStickerViewModal;
