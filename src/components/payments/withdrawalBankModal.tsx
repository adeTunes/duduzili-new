import {
  Group,
  LoadingOverlay,
  Modal,
  PinInput,
  Radio,
  Stepper,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import ModalStepper from "./modalStepper";
import PrimaryButton from "../button/primaryButton";
import SelectWithdrawalAccount from "./selectWithdrawalAccount";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import ConfirmWithdrawalAccount from "./confirmWithdrawalAccount";
import {
  generateTokenForWithdrawal,
  makeWithdrawal,
  sendOTP,
  verifyTokenForWithdrawal,
} from "../../../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useAtomValue } from "jotai";
import { withdrawalDetails } from "@/store";
import { amountFormatter } from "@/helpers/amountFormatter";

export default function WithdrawalBankModal({ opened, close, openSuccess }) {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));
  const form = useForm({
    initialValues: {
      amount: "",
    },
  });

  const [otp, setOTP] = useState("");
  // const resendOTP = () => {
  //   setLoading(true);
  //   const data = new FormData();
  //   // data.append("email", email);
  //   sendOTP(data)
  //     .then(({ data }) => {
  //       showNotification({
  //         message: data?.error ?? data?.message,
  //         color: "green",
  //       });
  //       setLoading(false);
  //     })
  //     .catch((e) => {
  //       setLoading(false);
  //       errorMessageHandler(e);
  //     });
  // };
  const [amount, setAmount] = useState("");
  const details: any = useAtomValue(withdrawalDetails);
  const entries = {
    "Bank name": details?.["Bank name"],
    "Account number": details?.["Account number"],
    "Account name": details?.["Account name"],
    Amount: "N" + (amount || "0"),
  };

  useEffect(() => {
    amountFormatter(form.values.amount, setAmount);
  }, [form.values.amount]);

  useEffect(() => {
    if (active === 1) {
      setLoading(true);
      generateTokenForWithdrawal()
        .then(({ data }) => {
          setLoading(false);
          showNotification({
            message: data?.data || data?.error || data?.message,
          });
        })
        .catch((e) => {
          setLoading(false);
          errorMessageHandler(e);
        });
    }
  }, [active]);

  const handleWithdrawal = () => {
    const data = new FormData();
    data.append("amount", form.values.amount);
    data.append("account_id", details?.id);
    makeWithdrawal(data)
      .then(({ data }) => {
        setLoading(false);
        if (!data?.message?.includes("successful")) {
          return showNotification({
            message: data?.data?.non_field_errors || data?.data,
          });
        }
        showNotification({
          message: data?.data,
        });
        close();
        openSuccess();
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  };

  const handleVerifyCode = () => {
    if (!otp)
      return showNotification({
        message: "Please enter code",
        color: "red",
      });
    setLoading(true);
    const data = new FormData();
    data.append("code", otp);
    verifyTokenForWithdrawal(data)
      .then(({ data }) => {
        if (!data?.message?.includes("successful")) {
          return showNotification({
            message: data?.data,
          });
        }
        showNotification({
          message: data?.data,
        });
        handleWithdrawal();
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  };

  return (
    <Modal
      size="55vw"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content:
          "py-6 px-8 rounded-[24px] min-w-[280px] gap-3 max-w-[580px] flex flex-col overflow-auto",
        header: "!px-0 !pt-0 !pb-0",
        title: "font-bold text-[24px] text-[#2A2A2A] leading-[29px]",
        body: "overflow-auto grid grid-rows-[auto_auto_1fr] !gap-[40px] !p-0",
      }}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
      }}
      opened={opened}
      closeOnClickOutside={false}
      onClose={() => {
        setActive(0);
        close();
      }}
      title="Withdraw Fund"
      centered
    >
      <p className="text-[#757575] font-medium leading-6">
        {active === 0 ? (
          "Confirm withdrawal account"
        ) : (
          <span className="flex flex-col">
            <small>Verify account.</small>
            <small>
              Please enter the OTP (One-Time Password) that was sent to your
              email
            </small>
          </span>
        )}
      </p>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        allowNextStepsSelect={false}
        color="#4534B8"
        classNames={{
          root: "pb-[30px] border-b border-b-solid border-b-[#F3F3F3]",
          separatorActive: "h-[5px] rounded-[5px]",
          separator: "h-[5px] rounded-[5px]",
        }}
      >
        <Stepper.Step completedIcon={<span>1</span>}></Stepper.Step>
        <Stepper.Step completedIcon={<span>2</span>}></Stepper.Step>
      </Stepper>
      {active === 0 ? (
        <>
          <div
            style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
            className="p-6 flex flex-col gap-[25px] rounded-lg"
          >
            {Object.entries(entries).map(([key, value], index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="font-medium leading-6 text-[#bdbdbd]">{key}</p>
                <p className="text-[#2a2a2a] leading-6 font-semibold">
                  {value}
                </p>
              </div>
            ))}
            <TextInput
              label="Amount to withdraw"
              placeholder="Enter amount"
              classNames={{
                label: "text-[#2a2a2a] font-medium leading-6",
                root: "flex flex-col gap-2",
                input:
                  "h-[48px] border border-[#C8C8C8] rounded-[8px] placeholder:text-[#757575] leading-6 text-[15px]",
              }}
              {...form.getInputProps("amount")}
            />
          </div>
          <PrimaryButton
            text={active === 0 ? "Confirm Account" : "Verify OTP"}
            onClick={() => {
              nextStep()
              sessionStorage.setItem("withdraw-amount", form.values.amount);
            }}
          />
        </>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerifyCode();
          }}
          className="flex-1 h-full flex flex-col !gap-[40px]"
        >
          <div>
            <TextInput
              placeholder="Enter OTP"
              classNames={{
                label: "text-[#2a2a2a] font-medium leading-6",
                root: "flex flex-col gap-2",
                input:
                  "h-[48px] border border-[#C8C8C8] rounded-[8px] placeholder:text-[#757575] leading-6 text-[15px]",
              }}
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
            {/* <div className="flex items-center w-full justify-between"> */}
            {/* <p className="text-[#757575] leading-6 font-medium">0:05</p> */}
            {/* <p
                className="text-[#3B81E5] leading-6 font-medium ml-auto cursor-pointer"
                onClick={resendOTP}
              >
                Resend code
              </p> */}
            {/* </div> */}
          </div>
          <PrimaryButton
            text={active === 0 ? "Confirm Account" : "Verify OTP"}
          />
        </form>
      )}

      <LoadingOverlay visible={loading} />
    </Modal>
  );
}
