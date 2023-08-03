import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { NextPageX } from "../types/next";
import AuthenticationLayout from "@/layout/authentication";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { loginUser } from "../api/apiRequests";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import { Loading } from "@/components/loading";
import { useSetAtom } from "jotai";
import { userDetails } from "@/store";
import { LoginUser } from "../api/request.types";
import Head from "next/head";
import { useCookies } from "react-cookie";

const Home: NextPageX = () => {
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies(["duduzili-user"]);
  const setUser = useSetAtom(userDetails);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });
  const { push } = useRouter();
  const handleLogin = async (data: LoginUser) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      setUser(response.data);
      setLoading(false);
      setCookie("duduzili-user", response.data.token, { path: "/" });
      push("/home");
    } catch (e) {
      setLoading(false);
      errorMessageHandler(e);
    }
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
          <title>Duduzili | Sign In</title>
        </Head>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(form.values);
          }}
          className="flex flex-col gap-12 w-fit"
        >
          <p className="text-duduzili-black-olive text-center text-[24px] font-bold leading-[29px]">
            Log In
          </p>
          <div className="flex gap-4 flex-col">
            <div className="flex flex-col gap-6">
              <TextInput
                autoComplete="off"
                classNames={{
                  input:
                    "border h-[5vh] border-solid min-w-[250px] border-duduzili-chinese-white rounded-lg",
                }}
                placeholder="Email address"
                required
                {...form.getInputProps("email")}
              />
              <PasswordInput
                classNames={{
                  innerInput: "h-[5vh] min-w-[250px]",
                  input:
                    "border h-[5vh] border-solid min-w-[250px] border-duduzili-chinese-white rounded-lg",
                }}
                placeholder="Password"
                required
                {...form.getInputProps("password")}
              />
            </div>
            <Link href="/forgot-password" className="self-end">
              <p className=" text-duduzili-violet text-sm leading-4 font-medium">
                Forgot Password?
              </p>
            </Link>
          </div>
          <Button
            type="submit"
            className="bg-duduzili-violet text-lg font-semibold h-[5.8vh] rounded-lg"
          >
            Log In
          </Button>
          <p className="self-center leading-6 font-medium text-duduzili-charleston-green">
            Not a member yet?
            <Link href="/sign-up">
              <span className=" text-duduzili-violet">Sign up</span>
            </Link>
          </p>
        </form>
        <Loading loading={loading} />
      </div>
    </AuthenticationLayout>
  );
};

export default Home;
