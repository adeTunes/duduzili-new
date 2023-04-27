import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { NextPageX } from "../types/next";
import AuthenticationLayout from "@/layout/authentication";
import { showNotification } from "@mantine/notifications";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { loginUser } from "../api/apiRequests";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import { Loading } from "@/components/loading";
import { useSetAtom } from "jotai";
import { userDetails } from "@/store";

const Home: NextPageX = () => {
  const [loading, setLoading] = useState(false);
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
      push("/");
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
          handleLogin(form.values);
        }}
        className="flex flex-col gap-12 w-[45%]"
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
                  "border border-solid border-duduzili-chinese-white rounded-lg",
              }}
              placeholder="Email address/ username"
              required
              {...form.getInputProps("email")}
            />
            <PasswordInput
              classNames={{
                input:
                  "border border-solid border-duduzili-chinese-white rounded-lg",
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
          className="bg-duduzili-violet text-lg font-semibold h-[54px] rounded-lg"
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
  );
};

Home.Layout = AuthenticationLayout;
export default Home;
