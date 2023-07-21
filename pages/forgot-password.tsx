import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { NextPageX } from "../types/next";
import AuthenticationLayout from "@/layout/authentication";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import { sendOTP } from "../api/apiRequests";
import { showNotification } from "@mantine/notifications";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { Loading } from "@/components/loading";
import { useSetAtom } from "jotai";
import { verifyAccountEmail } from "@/store";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const ForgotPassword: NextPageX = () => {
  const { push } = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const setEmail = useSetAtom(verifyAccountEmail);
  useEffect(() => {
    setEmail(form.values.email);
  }, [form.values.email]);
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
          <title>Duduzili | Forgot Password</title>
        </Head>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            const data = new FormData();
            data.append("email", form.values.email);
            sendOTP(data)
              .then(({ data }) => {
                showNotification({
                  message: data?.message,
                  color: "green",
                });
                push("/verify-account");
                setLoading(false);
              })
              .catch((e) => {
                setLoading(false);
                errorMessageHandler(e);
              });
          }}
          className="flex flex-col max-w-[274px] gap-12 w-fit"
        >
          <div className="flex flex-col gap-4">
            <p className="text-duduzili-black-olive text-center text-[24px] font-bold leading-[29px]">
              Forgot password
            </p>
            <small className="font-medium leading-6 text-duduzili-gray(X11) text-center">
              Enter your email and we will send you a reset link
            </small>
          </div>
          <div className="flex gap-4 flex-col">
            <TextInput
              required
              type="email"
              autoComplete="off"
              classNames={{
                input:
                  "border h-[5vh] min-w-[250px] border-solid border-duduzili-chinese-white rounded-lg",
              }}
              placeholder="Email address"
              {...form.getInputProps("email")}
            />
          </div>
          <Button
            type="submit"
            className="bg-duduzili-violet text-lg font-semibold h-[54px] rounded-lg"
          >
            Send me the link
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

export default ForgotPassword;
