import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { NextPageX } from "../types/next";
import AuthenticationLayout from "@/layout/authentication";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { resetPassword } from "../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import {useState} from "react"
import { useRouter } from "next/router";
import { Loading } from "@/components/loading";
import { useAtomValue } from "jotai";
import { verifyAccountEmail } from "@/store";

const inter = Inter({ subsets: ["latin"] });

const ResetPassword: NextPageX = () => {
  const [loading, setLoading] = useState(false)
  const email = useAtomValue(verifyAccountEmail)
  const {push} = useRouter()
  const form = useForm({
    initialValues: {
      new_password: "",
      confirm_password: ""
    }
  })
  const handleResetPassword = (e) => {
    e.preventDefault()
    if (form.values.new_password !== form.values.confirm_password)
      return showNotification({
        message: "Passwords don't match",
        color: "red",
      });
      setLoading(true)
    resetPassword({
      email ,
      password: form.values.new_password,
    })
      .then(({ data }) => {
        showNotification({
          message: data?.message || data?.error,
          color: "green",
        });
        setLoading(false);
        push("/login")
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  }
  return (
    <div className="flex-1 flex items-center justify-center">
      <form onSubmit={handleResetPassword} className="flex flex-col gap-12 w-[45%]">
        <div className="flex flex-col gap-4">
          <p className="text-duduzili-black-olive text-center text-[24px] font-bold leading-[29px]">
            Reset password
          </p>
          <small className="font-medium leading-6 text-duduzili-gray(X11) text-center">
            Enter a new password for your account
          </small>
        </div>
        <div className="flex gap-4 flex-col">
          <PasswordInput
            autoComplete="off"
            classNames={{
              innerInput: "h-12",
              input:
                "border h-[48px] border-solid border-duduzili-chinese-white rounded-lg",
            }}
            placeholder="Password"
            {...form.getInputProps("new_password")}
          />
          <PasswordInput
            autoComplete="off"
            classNames={{
              innerInput: "h-12",
              input:
                "border h-[48px] border-solid border-duduzili-chinese-white rounded-lg",
            }}
            placeholder="Confirm password"
            {...form.getInputProps("confirm_password")}
          />
        </div>
        <Button type="submit" className="bg-duduzili-violet text-lg font-semibold h-[54px] rounded-lg">
          Reset password
        </Button>
        <p className="self-center leading-6 font-medium text-duduzili-charleston-green">
          Go back to{" "}
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
