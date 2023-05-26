import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { NextPageX } from "../types/next";
import AuthenticationLayout from "@/layout/authentication";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const ForgotPassword: NextPageX = () => {
  const { push } = useRouter();
  return (
    <div className="flex-1 flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          push("/verify-account");
        }}
        className="flex flex-col gap-12 w-[45%]"
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
            autoComplete="off"
            classNames={{
              input:
                "border h-[48px] border-solid border-duduzili-chinese-white rounded-lg",
            }}
            placeholder="Email address"
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
    </div>
  );
};

ForgotPassword.Layout = AuthenticationLayout;
export default ForgotPassword;
