import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { NextPageX } from "../types/next";
import AuthenticationLayout from "@/layout/authentication";
import { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { verifyAccount } from "../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { showNotification } from "@mantine/notifications";

const inter = Inter({ subsets: ["latin"] });

const ResetPassword: NextPageX = () => {
  const form = useForm({
    initialValues: {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
    },
  });

  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const inputRef4 = useRef<HTMLInputElement>(null);
  const inputRef5 = useRef<HTMLInputElement>(null);
  const inputRef6 = useRef<HTMLInputElement>(null);

  //   useEffect(() => {
  //     inputRef1.current?.focus();
  //     inputRef2.current?.disabled;
  //     inputRef3.current?.disabled;
  //     inputRef4.current?.disabled;
  //     inputRef5.current?.disabled;
  //     inputRef6.current?.disabled;
  //     // if(form.values.input1) {
  //     //     inputRef2.current?.style.pointerEvents = "none"
  //     // }
  //   }, [form.values]);

  const { query, push } = useRouter();
  const [loading, setLoading] = useState(false);
  const handleVerifyAccount = async (data: verifyAccount) => {
    setLoading(true);
    try {
      const response = await verifyAccount(data);
      showNotification({
        title: "Success",
        message: response.data.message,
        color: "green",
      });
      setLoading(false);
      push("/home");
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
          handleVerifyAccount({
            otp: Object.values(form.values).join("") as any,
            email: query.email as string,
          });
        }}
        className="flex flex-col gap-12 w-[45%]"
      >
        <div className="flex flex-col gap-4">
          <p className="text-duduzili-black-olive text-center text-[24px] font-bold leading-[29px]">
            Verify account
          </p>
          <small className="font-medium leading-6 text-duduzili-gray(X11) text-center">
            Enter the 6-digits OTP (One-Time password) sent to your email
          </small>
        </div>
        <div className="flex gap-4 justify-center">
          <TextInput
            autoComplete="off"
            className="w-[40px]"
            classNames={{
              input:
                "border border-solid h-[40px] border-duduzili-chinese-white rounded-lg",
            }}
            ref={inputRef1}
            {...form.getInputProps("input1")}
          />
          <TextInput
            autoComplete="off"
            className="w-[40px]"
            classNames={{
              input:
                "border border-solid h-[40px] border-duduzili-chinese-white rounded-lg",
            }}
            ref={inputRef2}
            {...form.getInputProps("input2")}
          />
          <TextInput
            autoComplete="off"
            className="w-[40px]"
            classNames={{
              input:
                "border border-solid h-[40px] border-duduzili-chinese-white rounded-lg",
            }}
            ref={inputRef3}
            {...form.getInputProps("input3")}
          />
          <TextInput
            autoComplete="off"
            className="w-[40px]"
            classNames={{
              input:
                "border border-solid h-[40px] border-duduzili-chinese-white rounded-lg",
            }}
            ref={inputRef4}
            {...form.getInputProps("input4")}
          />
          <TextInput
            autoComplete="off"
            className="w-[40px]"
            classNames={{
              input:
                "border border-solid h-[40px] border-duduzili-chinese-white rounded-lg",
            }}
            ref={inputRef5}
            {...form.getInputProps("input5")}
          />
          <TextInput
            autoComplete="off"
            className="w-[40px]"
            classNames={{
              input:
                "border border-solid h-[40px] border-duduzili-chinese-white rounded-lg",
            }}
            ref={inputRef6}
            {...form.getInputProps("input6")}
          />
        </div>
        <Button
          type="submit"
          className="bg-duduzili-violet text-lg font-semibold h-[54px] rounded-lg"
        >
          Confirm OTP
        </Button>
        <p className="self-center leading-6 font-medium text-duduzili-charleston-green">
          Go back to{" "}
          <Link href="/login">
            <span className=" text-duduzili-violet">Log in</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

ResetPassword.Layout = AuthenticationLayout;
export default ResetPassword;
