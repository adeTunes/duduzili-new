import { Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { NextPageX } from "../types/next";
import AuthenticationLayout from "@/layout/authentication";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { Loading } from "@/components/loading";
import { RegisterUser } from "../api/request.types";
import { registerUser } from "../api/apiRequests";
import { useAtomValue, useSetAtom } from "jotai";
import { verifyAccountEmail } from "@/store";
import Head from "next/head";
import { notify } from "../utils/notification-handler";

const SignUp: NextPageX = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  const setEmail = useSetAtom(verifyAccountEmail);
  useEffect(() => {
    setEmail(form.values.email);
  }, [form.values.email]);
  const { push } = useRouter();
  const handleRegister = async (data: RegisterUser) => {
    setLoading(true);
    try {
      const response = await registerUser(data);
      notify({
        title: "Success",
        message: response.data.message,
        color: "green",
      });
      setLoading(false);
      push("/sign-up-verify");
    } catch (e) {
      setLoading(false);
      errorMessageHandler(e);
    }
  };
  return (
    <AuthenticationLayout>
      <div className="flex-1 flex items-center justify-center px-5 max-[300px]:px-2">
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
          <title>Duduzili | Register</title>
        </Head>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (form.values.password !== form.values.confirm_password)
              return notify({
                title: "Error",
                message: "Passwords don't match",
                color: "red",
              });
            const { confirm_password, ...data } = form.values;
            handleRegister(data);
          }}
          className="flex flex-col gap-12 w-fit"
        >
          <p className="text-duduzili-black-olive text-center text-[24px] font-bold leading-[29px]">
            Sign Up
          </p>
          <div className="flex gap-4 flex-col">
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 max-[400px]:grid-cols-1 min-w-[250px] gap-6">
                <TextInput
                  required
                  autoComplete="off"
                  classNames={{
                    input:
                      "border h-[5vh] border-solid border-duduzili-chinese-white rounded-lg",
                  }}
                  placeholder="First Name"
                  {...form.getInputProps("first_name")}
                />
                <TextInput
                  required
                  autoComplete="off"
                  classNames={{
                    input:
                      "border h-[5vh] border-solid border-duduzili-chinese-white rounded-lg",
                  }}
                  placeholder="Last Name"
                  {...form.getInputProps("last_name")}
                />
              </div>
              {/* <TextInput
              required
              autoComplete="off"
              classNames={{
                input:
                  "border border-solid border-duduzili-chinese-white rounded-lg",
              }}
              placeholder="Full name"
              {...form.getInputProps("fullname")}
            /> */}
              <TextInput
                required
                autoComplete="off"
                classNames={{
                  input:
                    "border h-[5vh] min-w-[250px] border-solid border-duduzili-chinese-white rounded-lg",
                }}
                type="email"
                placeholder="Email address"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                required
                classNames={{
                  innerInput: "h-[5vh] min-w-[250px]",
                  input:
                    "border h-[5vh] min-w-[250px] border-solid border-duduzili-chinese-white rounded-lg",
                }}
                placeholder="Password"
                {...form.getInputProps("password")}
              />
              <PasswordInput
                required
                classNames={{
                  innerInput: "h-[5vh] min-w-[250px]",
                  input:
                    "border h-[5vh] min-w-[250px] border-solid border-duduzili-chinese-white rounded-lg",
                }}
                placeholder="Confirm Password"
                {...form.getInputProps("confirm_password")}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="bg-duduzili-violet text-lg font-semibold h-[5.8vh] rounded-lg"
          >
            Sign Up
          </Button>
          <p className="self-center leading-6 font-medium text-duduzili-charleston-green">
            Already a member?{" "}
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
export default SignUp;
