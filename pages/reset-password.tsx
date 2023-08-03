import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { NextPageX } from "../types/next";
import AuthenticationLayout from "@/layout/authentication";
import { useForm } from "@mantine/form";
import { resetPassword } from "../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useState } from "react";
import { useRouter } from "next/router";
import { Loading } from "@/components/loading";
import { useAtomValue } from "jotai";
import { verifyAccountEmail } from "@/store";
import Head from "next/head";
import { notify } from "../utils/notification-handler";

const inter = Inter({ subsets: ["latin"] });

const ResetPassword: NextPageX = () => {
  const [loading, setLoading] = useState(false);
  const email = useAtomValue(verifyAccountEmail);
  const { push } = useRouter();
  const form = useForm({
    initialValues: {
      new_password: "",
      confirm_password: "",
    },
  });
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (form.values.new_password !== form.values.confirm_password)
      return notify({
        message: "Passwords don't match",
        color: "red",
      });
    setLoading(true);
    resetPassword({
      email,
      password: form.values.new_password,
    })
      .then(({ data }) => {
        notify({
          message: data?.message || data?.error,
          color: "green",
        });
        setLoading(false);
        push("/login");
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  };
  return (
    <AuthenticationLayout>
      <div className="flex-1 flex items-center justify-center">
        <Head>
          <meta
            name="description"
            content="Join Duduzili, the social media app that brings people together. Share your ideas and beliefs without fear of censorship. Empower yourself and control the value of your creations. Start connecting and engaging in diverse conversations today!"
          />
          <meta
            property="og:title"
            content="Duduzili - Uniting People and Empowering Authentic Expression"
          />
          <meta
            property="og:description"
            content="Duduzili is a social media app built for individuals who value authentic expression and want to control the value of their creations. Join us in connecting with others, sharing ideas, and engaging in diverse conversations without the fear of censorship."
          />
          <meta
            property="og:image"
            content={`${process.env.NEXT_PUBLIC_SITE_URL}/sitelogo.png`}
          />
          <title>Duduzili | Reset Password</title>
        </Head>
        <form
          onSubmit={handleResetPassword}
          className="flex flex-col gap-12 w-fit"
        >
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
                innerInput: "h-12 min-w-[250px]",
                input:
                  "border h-[48px] border-solid min-w-[250px] border-duduzili-chinese-white rounded-lg",
              }}
              placeholder="Password"
              {...form.getInputProps("new_password")}
            />
            <PasswordInput
              autoComplete="off"
              classNames={{
                innerInput: "h-12 min-w-[250px]",
                input:
                  "border h-[48px] min-w-[250px] border-solid border-duduzili-chinese-white rounded-lg",
              }}
              placeholder="Confirm password"
              {...form.getInputProps("confirm_password")}
            />
          </div>
          <Button
            type="submit"
            className="bg-duduzili-violet text-lg font-semibold h-[54px] rounded-lg"
          >
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
    </AuthenticationLayout>
  );
};
export default ResetPassword;
