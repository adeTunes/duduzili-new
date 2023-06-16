import { Button, PinInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { NextPageX } from "../types/next";
import AuthenticationLayout from "@/layout/authentication";
import { useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { showNotification } from "@mantine/notifications";
import { verifyAccountType } from "../api/request.types";
import { verifyAccount } from "../api/apiRequests";
import { useAtom, useAtomValue } from "jotai";
import { verifyAccountEmail } from "@/store";
import { Loading } from "@/components/loading";

const ResetPassword: NextPageX = () => {
  const [otp, setOTP] = useState("")
  const email = useAtomValue(verifyAccountEmail)
  const { query, push } = useRouter();
  const [loading, setLoading] = useState(false);
  const handleVerifyAccount = async (data) => {
    setLoading(true);
    try {
      const response = await verifyAccount(data);
      showNotification({
        title: "Success",
        message: response.data.message,
        color: "green",
      });
      setLoading(false);
      push("/login");
    } catch (e) {
      setLoading(false);
      errorMessageHandler(e);
    }
  };
  return (
    <div className="flex-1 flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData()
          data.append("otp", otp)
          data.append("email", email)
          handleVerifyAccount(data);
        }}
        className="flex flex-col gap-12 w-fit"
      >
        <div className="flex flex-col gap-4">
          <p className="text-duduzili-black-olive text-center text-[24px] font-bold leading-[29px]">
            Verify account
          </p>
          <small className="font-medium leading-6 max-w-[228px] text-duduzili-gray(X11) text-center">
            Enter the 6-digits OTP (One-Time password) sent to your email
          </small>
        </div>
        <div className="flex justify-center">
        <PinInput
        required
          length={6}
          classNames={{
            input: " border border-[#BDBDBD] bg-transparent rounded-[8px]",
          }}
          styles={{
            input: {
              width: "clamp(30px, 3vw, 53px)",
              height: "clamp(35px, 4vw, 48px)",
            }
          }}
          value={otp}
          onChange={setOTP}
        />
        </div>
        <Button
          type="submit"
          className="bg-duduzili-violet text-lg font-semibold h-[54px] rounded-lg"
        >
          Confirm OTP
        </Button>
        <p className="self-center leading-6 font-medium text-duduzili-charleston-green">
          Go to{" "}
          <Link href="/login">
            <span className=" text-duduzili-violet">Log in</span>
          </Link>
        </p>
      </form>
      <Loading loading={loading} />
    </div>
  );
};

ResetPassword.Layout = AuthenticationLayout;
export default ResetPassword;
