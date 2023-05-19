import { Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { NextPageX } from "../types/next";
import AuthenticationLayout from "@/layout/authentication";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useRouter } from "next/router";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { showNotification } from "@mantine/notifications";
import { Loading } from "@/components/loading";
import { RegisterUser } from "../api/request.types";
import { registerUser } from "../api/apiRequests";

const SignUp: NextPageX = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      // fullname: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  const { push } = useRouter();
  const handleRegister = async (data: RegisterUser) => {
    setLoading(true);
    try {
      const response = await registerUser(data);
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
          if (form.values.password !== form.values.confirm_password)
            return showNotification({
              title: "Error",
              message: "Passwords don't match",
              color: "red",
            });
          const { confirm_password, ...data } = form.values;
          handleRegister(data);
        }}
        className="flex flex-col gap-12 w-[45%]"
      >
        <p className="text-duduzili-black-olive text-center text-[24px] font-bold leading-[29px]">
          Sign Up
        </p>
        <div className="flex gap-4 flex-col">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
              <TextInput
                required
                autoComplete="off"
                classNames={{
                  input:
                    "border border-solid border-duduzili-chinese-white rounded-lg",
                }}
                placeholder="First Name"
                {...form.getInputProps("first_name")}
              />
              <TextInput
                required
                autoComplete="off"
                classNames={{
                  input:
                    "border border-solid border-duduzili-chinese-white rounded-lg",
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
                  "border border-solid border-duduzili-chinese-white rounded-lg",
              }}
              type="email"
              placeholder="Email address"
              {...form.getInputProps("email")}
            />
            <TextInput
              required
              autoComplete="off"
              classNames={{
                input:
                  "border border-solid border-duduzili-chinese-white rounded-lg",
              }}
              placeholder="Username"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              required
              classNames={{
                input:
                  "border border-solid border-duduzili-chinese-white rounded-lg",
              }}
              placeholder="Password"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              required
              classNames={{
                input:
                  "border border-solid border-duduzili-chinese-white rounded-lg",
              }}
              placeholder="Confirm Password"
              {...form.getInputProps("confirm_password")}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="bg-duduzili-violet text-lg font-semibold h-[54px] rounded-lg"
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
  );
};

SignUp.Layout = AuthenticationLayout;
export default SignUp;
